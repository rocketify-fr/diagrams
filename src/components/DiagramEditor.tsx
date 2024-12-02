import React from 'react';
import { Editor } from './Editor';
import { Preview } from './Preview';
import { Toolbar } from './Toolbar';
import { DiagramList } from './DiagramList';
import { DiagramType, DiagramFile } from '../types/diagram';
import { useSidebar } from '../hooks/useSidebar';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

interface DiagramEditorProps {
  type: DiagramType;
  code: string;
  svg: string;
  diagrams: DiagramFile[];
  currentDiagram: DiagramFile | null;
  onUpdateDiagram: (value: string) => void;
  onLoadDiagram: (diagram: DiagramFile) => void;
  onDeleteDiagram: (id: string) => void;
  onRenameDiagram: (id: string, newName: string) => void;
  onExportPng: () => void;
  onExportJpg: () => void;
  onExportPdf: () => void;
  onBack: () => void;
}

export const DiagramEditor: React.FC<DiagramEditorProps> = ({
  type,
  code,
  svg,
  diagrams,
  currentDiagram,
  onUpdateDiagram,
  onLoadDiagram,
  onDeleteDiagram,
  onRenameDiagram,
  onExportPng,
  onExportJpg,
  onExportPdf,
  onBack,
}) => {
  const { isOpen, toggle } = useSidebar();

  return (
    <div className="flex h-screen bg-gray-900">
      <div className={`flex flex-col ${isOpen ? 'w-64' : 'w-12'} transition-all duration-300`}>
        <button
          onClick={toggle}
          className="flex items-center justify-center h-12 bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700"
          title={isOpen ? 'Masquer la barre latérale' : 'Afficher la barre latérale'}
        >
          {isOpen ? (
            <PanelLeftClose className="w-5 h-5" />
          ) : (
            <PanelLeftOpen className="w-5 h-5" />
          )}
        </button>
        <div className={`flex-1 overflow-hidden ${isOpen ? 'block' : 'hidden'}`}>
          <DiagramList
            diagrams={diagrams}
            onSelect={onLoadDiagram}
            onDelete={onDeleteDiagram}
            onRename={onRenameDiagram}
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-2 bg-gray-800">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded"
            >
              ← Retour
            </button>
            {currentDiagram && (
              <h2 className="text-white font-medium">{currentDiagram.name}</h2>
            )}
          </div>
          <Toolbar
            onExportPng={onExportPng}
            onExportJpg={onExportJpg}
            onExportPdf={onExportPdf}
          />
        </div>
        <div className="flex-1 flex">
          <div className="w-1/2 border-r border-gray-700">
            <Editor value={code} onChange={onUpdateDiagram} />
          </div>
          <div className="w-1/2">
            <Preview svg={svg} />
          </div>
        </div>
      </div>
    </div>
  );
};