export type DiagramType = 'sequence' | 'flowchart' | 'classDiagram' | 'c4' | 'gantt';

export interface DiagramFile {
  id: string;
  name: string;
  content: string;
  type: DiagramType;
  lastModified: Date;
}