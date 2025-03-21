import React from 'react';
import { Workflow, Folder } from '../types/workflow';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { Eye, AlertCircle, ChevronDown, ChevronRight, Folder as FolderIcon, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface WorkflowListViewProps {
  workflows: Workflow[];
  folders: Folder[];
  onViewDetails: (id: string) => void;
  selectedFolder: string | null;
}

type SortField = 'name' | 'status' | 'folder' | 'lastRun' | 'executionCount' | 'errorRate';
type SortDirection = 'asc' | 'desc' | null;

interface SortState {
  field: SortField | null;
  direction: SortDirection;
}

const WorkflowListView: React.FC<WorkflowListViewProps> = ({ 
  workflows, 
  folders, 
  onViewDetails,
  selectedFolder 
}) => {
  const [expandedFolders, setExpandedFolders] = React.useState<Record<string, boolean>>({});
  const [sortState, setSortState] = React.useState<SortState>({
    field: null,
    direction: null
  });

  React.useEffect(() => {
    // Si un dossier est sélectionné, l'ouvrir automatiquement
    if (selectedFolder) {
      setExpandedFolders(prev => ({ ...prev, [selectedFolder]: true }));
    }
  }, [selectedFolder]);

  if (workflows.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed rounded-lg">
        <p className="text-muted-foreground">No workflows found</p>
      </div>
    );
  }

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

  // Obtenir le nom du dossier
  const getFolderName = (folderId: string | null) => {
    if (!folderId) return 'Non classé';
    const folder = folders.find(f => f.id === folderId);
    return folder ? folder.name : 'Non classé';
  };

  // Basculer l'état d'expansion d'un dossier
  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  // Gérer le tri des colonnes
  const handleSort = (field: SortField) => {
    setSortState(prev => {
      if (prev.field === field) {
        // Cycle through: asc -> desc -> null
        if (prev.direction === 'asc') {
          return { field, direction: 'desc' };
        } else if (prev.direction === 'desc') {
          return { field: null, direction: null };
        } else {
          return { field, direction: 'asc' };
        }
      } else {
        // New field, start with ascending
        return { field, direction: 'asc' };
      }
    });
  };

  // Fonction pour trier les workflows
  const sortWorkflows = (workflowsToSort: Workflow[]): Workflow[] => {
    if (!sortState.field || !sortState.direction) {
      return workflowsToSort;
    }

    return [...workflowsToSort].sort((a, b) => {
      let comparison = 0;
      
      switch (sortState.field) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'folder':
          const folderA = getFolderName(a.folder);
          const folderB = getFolderName(b.folder);
          comparison = folderA.localeCompare(folderB);
          break;
        case 'lastRun':
          comparison = new Date(a.lastRun).getTime() - new Date(b.lastRun).getTime();
          break;
        case 'executionCount':
          comparison = a.executionCount - b.executionCount;
          break;
        case 'errorRate':
          comparison = a.errorRate - b.errorRate;
          break;
        default:
          comparison = 0;
      }
      
      return sortState.direction === 'asc' ? comparison : -comparison;
    });
  };

  // Obtenir l'icône de tri pour une colonne
  const getSortIcon = (field: SortField) => {
    if (sortState.field !== field) {
      return <ArrowUpDown className="h-4 w-4 ml-1 opacity-50" />;
    }
    
    return sortState.direction === 'asc' 
      ? <ArrowUp className="h-4 w-4 ml-1" /> 
      : <ArrowDown className="h-4 w-4 ml-1" />;
  };

  // Organiser les workflows par dossier
  const workflowsByFolder: Record<string, Workflow[]> = {};
  
  // Ajouter une catégorie pour les workflows sans dossier
  workflowsByFolder['uncategorized'] = [];
  
  // Initialiser les tableaux pour chaque dossier
  folders.forEach(folder => {
    workflowsByFolder[folder.id] = [];
  });
  
  // Répartir les workflows dans leurs dossiers respectifs
  workflows.forEach(workflow => {
    if (workflow.folder) {
      workflowsByFolder[workflow.folder].push(workflow);
    } else {
      workflowsByFolder['uncategorized'].push(workflow);
    }
  });

  // Trier les workflows dans chaque dossier si un tri est actif
  if (sortState.field && sortState.direction) {
    Object.keys(workflowsByFolder).forEach(folderId => {
      workflowsByFolder[folderId] = sortWorkflows(workflowsByFolder[folderId]);
    });
  }

  // Si un dossier spécifique est sélectionné, n'afficher que ce dossier
  const foldersToRender = selectedFolder 
    ? [selectedFolder] 
    : [...folders.map(f => f.id), 'uncategorized'];
  
  return (
    <div className="rounded-md border border-border/50 bg-card/90 backdrop-blur-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-secondary/30">
          <TableRow>
            <TableHead 
              className="w-[250px] cursor-pointer hover:bg-secondary/50"
              onClick={() => handleSort('name')}
            >
              <div className="flex items-center">
                Name
                {getSortIcon('name')}
              </div>
            </TableHead>
            <TableHead 
              className="w-[100px] cursor-pointer hover:bg-secondary/50"
              onClick={() => handleSort('status')}
            >
              <div className="flex items-center">
                Status
                {getSortIcon('status')}
              </div>
            </TableHead>
            <TableHead 
              className="w-[120px] cursor-pointer hover:bg-secondary/50"
              onClick={() => handleSort('folder')}
            >
              <div className="flex items-center">
                Folder
                {getSortIcon('folder')}
              </div>
            </TableHead>
            <TableHead 
              className="w-[150px] cursor-pointer hover:bg-secondary/50"
              onClick={() => handleSort('lastRun')}
            >
              <div className="flex items-center">
                Last Run
                {getSortIcon('lastRun')}
              </div>
            </TableHead>
            <TableHead 
              className="w-[100px] cursor-pointer hover:bg-secondary/50"
              onClick={() => handleSort('executionCount')}
            >
              <div className="flex items-center">
                Executions
                {getSortIcon('executionCount')}
              </div>
            </TableHead>
            <TableHead 
              className="w-[100px] cursor-pointer hover:bg-secondary/50"
              onClick={() => handleSort('errorRate')}
            >
              <div className="flex items-center">
                Error Rate
                {getSortIcon('errorRate')}
              </div>
            </TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {foldersToRender.map(folderId => {
            const folderWorkflows = workflowsByFolder[folderId] || [];
            if (folderWorkflows.length === 0) return null;
            
            const isExpanded = expandedFolders[folderId] || false;
            const folderName = folderId === 'uncategorized' ? 'Non classé' : getFolderName(folderId);
            
            return (
              <React.Fragment key={folderId}>
                <TableRow 
                  className="bg-secondary/20 hover:bg-secondary/30 cursor-pointer"
                  onClick={() => toggleFolder(folderId)}
                >
                  <TableCell colSpan={7} className="py-2">
                    <div className="flex items-center">
                      {isExpanded ? 
                        <ChevronDown className="h-4 w-4 mr-2 text-muted-foreground" /> : 
                        <ChevronRight className="h-4 w-4 mr-2 text-muted-foreground" />
                      }
                      <FolderIcon className="h-4 w-4 mr-2 text-neon-blue" />
                      <span className="font-medium">{folderName}</span>
                      <span className="ml-2 text-xs text-muted-foreground">
                        ({folderWorkflows.length} workflow{folderWorkflows.length !== 1 ? 's' : ''})
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
                
                {isExpanded && folderWorkflows.map((workflow) => (
                  <TableRow key={workflow.id} className="hover:bg-secondary/20">
                    <TableCell className="font-medium pl-10">{workflow.name}</TableCell>
                    <TableCell>
                      <div className={`flex items-center ${getStatusColor(workflow.status)}`}>
                        {workflow.status === 'active' && <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>}
                        {workflow.status === 'error' && <AlertCircle className="w-4 h-4 mr-1" />}
                        <span className="text-xs capitalize">{workflow.status}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getFolderName(workflow.folder)}</TableCell>
                    <TableCell>{formatDate(workflow.lastRun)}</TableCell>
                    <TableCell>{workflow.executionCount}</TableCell>
                    <TableCell>{workflow.errorRate}%</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-neon-blue hover:bg-neon-blue/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewDetails(workflow.id);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default WorkflowListView;
