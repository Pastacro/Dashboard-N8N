import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Eye, Play, Clock, AlertCircle } from 'lucide-react';
import { Workflow, Folder } from '../types/workflow';

interface WorkflowCardProps {
  workflow: Workflow;
  folders: Folder[];
  onViewDetails: (id: string) => void;
}

const WorkflowCard: React.FC<WorkflowCardProps> = ({ workflow, folders, onViewDetails }) => {
  const folder = folders.find(f => f.id === workflow.folder);
  
  // Déterminer la couleur de statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      case 'inactive':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };
  
  // Formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <Card className="overflow-hidden card-hover border-border/30 bg-card/90 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold truncate">{workflow.name}</CardTitle>
          <div className={`flex items-center ${getStatusColor(workflow.status)}`}>
            {workflow.status === 'active' && <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>}
            {workflow.status === 'error' && <AlertCircle className="w-4 h-4 mr-1" />}
            <span className="text-xs capitalize">{workflow.status}</span>
          </div>
        </div>
        {folder && (
          <div className="text-xs text-muted-foreground mt-1">
            Folder: {folder.name}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2 h-10">
          {workflow.description || 'No description provided'}
        </p>
        
        <div className="flex items-center mt-3 text-xs text-muted-foreground">
          <Clock className="w-3 h-3 mr-1" />
          <span>Last run: {formatDate(workflow.lastRun)}</span>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center text-xs">
            <div className="flex items-center mr-3">
              <Play className="w-3 h-3 mr-1" />
              <span>{workflow.executionCount} runs</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full text-neon-blue hover:bg-neon-blue/10"
          onClick={() => onViewDetails(workflow.id)}
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkflowCard;
