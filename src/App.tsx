import React, { useEffect } from 'react';
import mermaid from 'mermaid';
import { HomePage } from './components/HomePage';
import { DiagramEditor } from './components/DiagramEditor';
import { useDiagram } from './hooks/useDiagram';

function App() {
  const {
    code,
    svg,
    selectedType,
    diagrams,
    currentDiagram,
    updateDiagram,
    renameDiagram,
    selectDiagramType,
    loadDiagram,
    deleteDiagram,
    resetDiagram,
    exportToPng,
    exportToJpg,
    exportToPdf,
  } = useDiagram();

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
    });
  }, []);

  if (!selectedType) {
    return <HomePage onSelectDiagram={selectDiagramType} />;
  }

  return (
    <DiagramEditor
      type={selectedType}
      code={code}
      svg={svg}
      diagrams={diagrams}
      currentDiagram={currentDiagram}
      onUpdateDiagram={updateDiagram}
      onLoadDiagram={loadDiagram}
      onDeleteDiagram={deleteDiagram}
      onRenameDiagram={renameDiagram}
      onExportPng={exportToPng}
      onExportJpg={exportToJpg}
      onExportPdf={exportToPdf}
      onBack={resetDiagram}
    />
  );
}

export default App;