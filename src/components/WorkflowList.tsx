import React from 'react';
import { Workflow, Folder } from '../types/workflow';
import WorkflowCard from './WorkflowCard';

interface WorkflowListProps {
  workflows: Workflow[];
  folders: Folder[];
  onViewDetails: (id: string) => void;
}

const WorkflowList: React.FC<WorkflowListProps> = ({ workflows, folders, onViewDetails }) => {
  if (workflows.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed rounded-lg">
        <p className="text-muted-foreground">No workflows found</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {workflows.map(workflow => (
        <WorkflowCard 
          key={workflow.id} 
          workflow={workflow} 
          folders={folders}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

export default WorkflowList;
