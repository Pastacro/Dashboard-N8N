import React from 'react';
import { Folder } from '../types/workflow';
import { Button } from './ui/button';
import { Folder as FolderIcon } from 'lucide-react';

interface FolderListProps {
  folders: Folder[];
  selectedFolder: string | null;
  onSelectFolder: (id: string | null) => void;
}

const FolderList: React.FC<FolderListProps> = ({ folders, selectedFolder, onSelectFolder }) => {
  return (
    <div className="space-y-1 bg-card/50 backdrop-blur-sm rounded-lg p-2">
      <Button
        variant="ghost"
        className={`w-full justify-start text-left ${
          selectedFolder === null ? 'bg-secondary/60' : 'hover:bg-secondary/30'
        }`}
        onClick={() => onSelectFolder(null)}
      >
        <FolderIcon className="h-4 w-4 mr-2 text-neon-blue" />
        All Workflows
      </Button>
      
      {folders.map((folder) => (
        <Button
          key={folder.id}
          variant="ghost"
          className={`w-full justify-start text-left ${
            selectedFolder === folder.id ? 'bg-secondary/60' : 'hover:bg-secondary/30'
          }`}
          onClick={() => onSelectFolder(folder.id)}
        >
          <FolderIcon className="h-4 w-4 mr-2 text-muted-foreground" />
          {folder.name}
        </Button>
      ))}
    </div>
  );
};

export default FolderList;
