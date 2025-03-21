import React, { useState, useEffect } from 'react';
import { Activity, Plus, User, Moon, Sun, Grid, List } from 'lucide-react';
import { Button } from './components/ui/button';
import WorkflowList from './components/WorkflowList';
import WorkflowListView from './components/WorkflowListView';
import WorkflowDetails from './components/WorkflowDetails';
import FolderList from './components/FolderList';
import ApiCredentialsDialog from './components/ApiCredentialsDialog';
import { mockWorkflows, mockFolders } from './data/mockData';

function App() {
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isApiDialogOpen, setIsApiDialogOpen] = useState(false);
  const [apiCredentials, setApiCredentials] = useState<{
    apiUrl: string;
    apiKey: string;
  } | null>(null);
  
  // Gérer le changement de thème
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };
  
  // S'assurer que le mode sombre est appliqué au chargement
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);
  
  const filteredWorkflows = selectedFolder 
    ? mockWorkflows.filter(workflow => workflow.folder === selectedFolder)
    : mockWorkflows;
  
  const selectedWorkflow = mockWorkflows.find(w => w.id === selectedWorkflowId);
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-neon-blue" />
            <h1 className="text-xl font-bold neon-blue">n8n Workflow Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsApiDialogOpen(true)}
              className="text-foreground/80 hover:text-foreground"
            >
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-foreground/80 hover:text-foreground">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-6 px-4">
        {selectedWorkflow ? (
          <WorkflowDetails 
            workflow={selectedWorkflow} 
            onBack={() => setSelectedWorkflowId(null)} 
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Folders</h2>
                <Button variant="ghost" size="icon" className="hover:bg-secondary/50">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <FolderList 
                folders={mockFolders} 
                selectedFolder={selectedFolder}
                onSelectFolder={setSelectedFolder}
              />
            </div>
            
            <div className="md:col-span-3 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  {selectedFolder 
                    ? `${mockFolders.find(f => f.id === selectedFolder)?.name} Workflows` 
                    : 'All Workflows'}
                </h2>
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-secondary/30 rounded-md p-1 mr-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={`h-8 w-8 ${viewMode === 'grid' ? 'bg-card' : ''}`}
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={`h-8 w-8 ${viewMode === 'list' ? 'bg-card' : ''}`}
                      onClick={() => setViewMode('list')}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button className="btn-neon-blue flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    New Workflow
                  </Button>
                </div>
              </div>
              
              {viewMode === 'grid' ? (
                <WorkflowList 
                  workflows={filteredWorkflows} 
                  folders={mockFolders}
                  onViewDetails={setSelectedWorkflowId}
                />
              ) : (
                <WorkflowListView 
                  workflows={filteredWorkflows} 
                  folders={mockFolders}
                  onViewDetails={setSelectedWorkflowId}
                  selectedFolder={selectedFolder}
                />
              )}
            </div>
          </div>
        )}
      </main>
      
      <footer className="border-t border-border/30 py-4 mt-8 bg-background/50">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          n8n Workflow Dashboard &copy; {new Date().getFullYear()}
        </div>
      </footer>

      <ApiCredentialsDialog 
        open={isApiDialogOpen} 
        onOpenChange={setIsApiDialogOpen}
        onSave={(credentials) => {
          setApiCredentials(credentials);
          setIsApiDialogOpen(false);
        }}
        credentials={apiCredentials}
      />
    </div>
  );
}

export default App;
