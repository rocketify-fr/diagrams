import React from 'react';
import { Download, Image, FileImage, FileText } from 'lucide-react';

interface ToolbarProps {
  onExportPng: () => void;
  onExportJpg: () => void;
  onExportPdf: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onExportPng,
  onExportJpg,
  onExportPdf,
}) => {
  return (
    <div className="flex items-center space-x-2 p-2 bg-gray-800">
      <button
        onClick={onExportPng}
        className="flex items-center px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded"
      >
        <Image className="w-4 h-4 mr-2" />
        PNG
      </button>
      <button
        onClick={onExportJpg}
        className="flex items-center px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded"
      >
        <FileImage className="w-4 h-4 mr-2" />
        JPG
      </button>
      <button
        onClick={onExportPdf}
        className="flex items-center px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded"
      >
        <FileText className="w-4 h-4 mr-2" />
        PDF
      </button>
    </div>
  );
};