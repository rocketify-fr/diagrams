import { useState, useCallback, useEffect } from 'react';
import mermaid from 'mermaid';
import { toPng, toJpeg } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { nanoid } from 'nanoid';
import { DiagramType, DiagramFile } from '../types/diagram';
import { getInitialCode } from '../utils/diagramTemplates';
import { StorageService } from '../services/storage';

const storage = new StorageService();

export const useDiagram = () => {
  const [code, setCode] = useState<string>('');
  const [svg, setSvg] = useState<string>('');
  const [selectedType, setSelectedType] = useState<DiagramType | null>(null);
  const [diagrams, setDiagrams] = useState<DiagramFile[]>([]);
  const [currentDiagram, setCurrentDiagram] = useState<DiagramFile | null>(null);
  const [hasModifications, setHasModifications] = useState(false);

  useEffect(() => {
    const initStorage = async () => {
      await storage.init();
      const savedDiagrams = await storage.getAllDiagrams();
      setDiagrams(savedDiagrams);
    };
    initStorage();
  }, []);

  const updateDiagram = useCallback(async (value: string) => {
    try {
      setCode(value);
      const { svg } = await mermaid.render('preview', value);
      setSvg(svg);

      if (currentDiagram) {
        const initialCode = getInitialCode(currentDiagram.type);
        if (!hasModifications && value !== initialCode) {
          setHasModifications(true);
        }

        if (hasModifications) {
          const updatedDiagram = {
            ...currentDiagram,
            content: value,
            lastModified: new Date(),
          };
          await storage.saveDiagram(updatedDiagram);
          setCurrentDiagram(updatedDiagram);
          setDiagrams((prev) =>
            prev.map((d) => (d.id === updatedDiagram.id ? updatedDiagram : d))
          );
        }
      }
    } catch (error) {
      console.error('Error rendering diagram:', error);
    }
  }, [currentDiagram, hasModifications]);

  const renameDiagram = useCallback(async (id: string, newName: string) => {
    const diagram = diagrams.find((d) => d.id === id);
    if (diagram) {
      const updatedDiagram = {
        ...diagram,
        name: newName,
        lastModified: new Date(),
      };
      await storage.saveDiagram(updatedDiagram);
      setDiagrams((prev) =>
        prev.map((d) => (d.id === id ? updatedDiagram : d))
      );
      if (currentDiagram?.id === id) {
        setCurrentDiagram(updatedDiagram);
      }
    }
  }, [diagrams, currentDiagram]);

  const selectDiagramType = useCallback(async (type: DiagramType) => {
    setSelectedType(type);
    const initialCode = getInitialCode(type);
    const newDiagram: DiagramFile = {
      id: nanoid(),
      name: `Nouveau ${type}`,
      content: initialCode,
      type,
      lastModified: new Date(),
    };
    setCurrentDiagram(newDiagram);
    setCode(initialCode);
    setHasModifications(false);
    const { svg } = await mermaid.render('preview', initialCode);
    setSvg(svg);
  }, []);

  const loadDiagram = useCallback(async (diagram: DiagramFile) => {
    setSelectedType(diagram.type);
    setCurrentDiagram(diagram);
    setHasModifications(true); // Existing diagrams are considered modified
    updateDiagram(diagram.content);
  }, [updateDiagram]);

  const deleteDiagram = useCallback(async (id: string) => {
    await storage.deleteDiagram(id);
    setDiagrams((prev) => prev.filter((d) => d.id !== id));
    if (currentDiagram?.id === id) {
      setCurrentDiagram(null);
      setSelectedType(null);
      setCode('');
      setSvg('');
      setHasModifications(false);
    }
  }, [currentDiagram]);

  const resetDiagram = useCallback(() => {
    setSelectedType(null);
    setCurrentDiagram(null);
    setCode('');
    setSvg('');
    setHasModifications(false);
  }, []);

  const exportToPng = useCallback(async () => {
    const element = document.getElementById('diagram-preview');
    if (element) {
      const dataUrl = await toPng(element);
      const link = document.createElement('a');
      link.download = `${currentDiagram?.name || 'diagram'}.png`;
      link.href = dataUrl;
      link.click();
    }
  }, [currentDiagram]);

  const exportToJpg = useCallback(async () => {
    const element = document.getElementById('diagram-preview');
    if (element) {
      const dataUrl = await toJpeg(element);
      const link = document.createElement('a');
      link.download = `${currentDiagram?.name || 'diagram'}.jpg`;
      link.href = dataUrl;
      link.click();
    }
  }, [currentDiagram]);

  const exportToPdf = useCallback(async () => {
    const element = document.getElementById('diagram-preview');
    if (element) {
      const dataUrl = await toPng(element);
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${currentDiagram?.name || 'diagram'}.pdf`);
    }
  }, [currentDiagram]);

  return {
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
  };
};