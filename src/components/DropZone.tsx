// src/components/DropZone.tsx
import React, { useCallback } from 'react';

interface DropZoneProps {
  onFilesDrop: (files: File[]) => void;
}

export default function DropZone({ onFilesDrop }: DropZoneProps) {
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    onFilesDrop(files);
  }, [onFilesDrop]);

  return (
    <div 
      className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <p>Drop images here to resize</p>
    </div>
  );
};