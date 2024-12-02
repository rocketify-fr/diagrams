import React from 'react';

interface PreviewProps {
  svg: string;
}

export const Preview: React.FC<PreviewProps> = ({ svg }) => {
  return (
    <div
      id="diagram-preview"
      className="w-full h-full bg-white p-4 overflow-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};