import React, { useState } from 'react';
import { DiagramFile } from '../types/diagram';
import { formatDate } from '../utils/date';
import { GitGraph, Network, GanttChart, Workflow, Box, Trash2, Edit2, Check, X } from 'lucide-react';

interface DiagramListProps {
  diagrams: DiagramFile[];
  onSelect: (diagram: DiagramFile) => void;
  onDelete: (id: string) => void;
  onRename: (id: string, newName: string) => void;
}

const typeToIcon = {
  sequence: Network,
  flowchart: Workflow,
  classDiagram: Box,
  c4: GitGraph,
  gantt: GanttChart,
};

export const DiagramList: React.FC<DiagramListProps> = ({
  diagrams,
  onSelect,
  onDelete,
  onRename,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState<string>('');

  const startEditing = (diagram: DiagramFile, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(diagram.id);
    setEditingName(diagram.name);
  };

  const cancelEditing = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(null);
  };

  const saveEditing = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (editingName.trim()) {
      onRename(id, editingName.trim());
    }
    setEditingId(null);
  };

  return (
    <div className="h-full bg-gray-800 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-white mb-4">Mes diagrammes</h2>
        <div className="space-y-2">
          {diagrams.map((diagram) => {
            const Icon = typeToIcon[diagram.type];
            const isEditing = editingId === diagram.id;

            return (
              <div
                key={diagram.id}
                className="flex items-center justify-between p-2 rounded hover:bg-gray-700 cursor-pointer group"
                onClick={() => !isEditing && onSelect(diagram)}
              >
                <div className="flex items-center space-x-2 flex-1">
                  <Icon className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="w-full bg-gray-900 text-white text-sm px-2 py-1 rounded"
                        onClick={(e) => e.stopPropagation()}
                        autoFocus
                      />
                    ) : (
                      <>
                        <div className="text-sm text-white truncate">{diagram.name}</div>
                        <div className="text-xs text-gray-400">
                          {formatDate(diagram.lastModified)}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {isEditing ? (
                    <>
                      <button
                        onClick={(e) => saveEditing(diagram.id, e)}
                        className="p-1 hover:bg-gray-600 rounded"
                      >
                        <Check className="w-4 h-4 text-green-400" />
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="p-1 hover:bg-gray-600 rounded"
                      >
                        <X className="w-4 h-4 text-red-400" />
                      </button>
                    </>
                  ) : (
                    <div className="opacity-0 group-hover:opacity-100 flex items-center space-x-1">
                      <button
                        onClick={(e) => startEditing(diagram, e)}
                        className="p-1 hover:bg-gray-600 rounded"
                      >
                        <Edit2 className="w-4 h-4 text-blue-400" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(diagram.id);
                        }}
                        className="p-1 hover:bg-gray-600 rounded"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};