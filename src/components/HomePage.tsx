import React from 'react';
import { GitGraph, Network, GanttChart, Workflow, Box } from 'lucide-react';
import { DiagramCard } from './DiagramCard';
import { DiagramType } from '../types/diagram';

interface HomePageProps {
  onSelectDiagram: (type: DiagramType) => void;
}

const diagramTypes = [
  {
    type: 'sequence' as DiagramType,
    title: 'Diagramme de Séquence',
    description: 'Visualisez les interactions entre différents composants ou acteurs au fil du temps',
    Icon: Network,
  },
  {
    type: 'flowchart' as DiagramType,
    title: 'Organigramme',
    description: 'Créez des diagrammes de flux pour représenter des processus et des workflows',
    Icon: Workflow,
  },
  {
    type: 'classDiagram' as DiagramType,
    title: 'Diagramme de Classes',
    description: 'Modélisez la structure de vos classes et leurs relations',
    Icon: Box,
  },
  {
    type: 'c4' as DiagramType,
    title: 'Diagramme C4',
    description: 'Visualisez l\'architecture logicielle à différents niveaux d\'abstraction',
    Icon: GitGraph,
  },
  {
    type: 'gantt' as DiagramType,
    title: 'Diagramme de Gantt',
    description: 'Planifiez et suivez les étapes de votre projet dans le temps',
    Icon: GanttChart,
  },
];

export const HomePage: React.FC<HomePageProps> = ({ onSelectDiagram }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Créez vos diagrammes</h1>
          <p className="text-gray-400 text-lg">
            Sélectionnez un type de diagramme pour commencer
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {diagramTypes.map((diagram) => (
            <DiagramCard
              key={diagram.type}
              title={diagram.title}
              description={diagram.description}
              Icon={diagram.Icon}
              onClick={() => onSelectDiagram(diagram.type)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};