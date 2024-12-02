import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DiagramCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  onClick: () => void;
}

export const DiagramCard: React.FC<DiagramCardProps> = ({
  title,
  description,
  Icon,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center p-6 bg-gray-800 rounded-lg transition-all hover:bg-gray-700 hover:scale-105"
    >
      <Icon className="w-12 h-12 mb-4 text-blue-400" />
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-center text-sm">{description}</p>
    </button>
  );
};