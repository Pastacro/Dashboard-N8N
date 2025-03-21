import React, { useState } from 'react';
import { Workflow } from '../types/workflow';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Play, Pause, AlertTriangle, Clock, BarChart, Settings, RefreshCw } from 'lucide-react';
import { formatDate, formatRelativeTime, getStatusColor } from '../lib/utils';
import { mockExecutionHistory } from '../data/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface WorkflowDetailsProps {
  workflow: Workflow;
  onBack: () => void;
}

const WorkflowDetails: React.FC<WorkflowDetailsProps> = ({ workflow, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const StatusIcon = () => {
    switch (workflow.status) {
      case 'active':
        return <Play className="h-5 w-5 text-green-500" />;
      case 'inactive':
        return <Pause className="h-5 w-5 text-gray-500" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };
  
  const executionHistory = mockExecutionHistory[workflow.id] || [];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">{workflow.name}</h1>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${workflow.status === 'active' ? 'bg-green-500/10' : workflow.status === 'error' ? 'bg-red-500/10' : 'bg-gray-500/10'}`}>
            <StatusIcon />
            <span className="capitalize">{workflow.status}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Run Now
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="executions">Executions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  Execution Times
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Last Run</p>
                    <p className="font-medium">{formatRelativeTime(workflow.lastRun)}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(workflow.lastRun)}</p>
                  </div>
                  {workflow.nextRun && (
                    <div>
                      <p className="text-xs text-muted-foreground">Next Run</p>
                      <p className="font-medium">{formatRelativeTime(workflow.nextRun)}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(workflow.nextRun)}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Total Executions</p>
                    <p className="font-medium">{workflow.executionCount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Average Execution Time</p>
                    <p className="font-medium">{workflow.averageExecutionTime}s</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Error Rate</p>
                    <p className={`font-medium ${workflow.errorRate > 2 ? 'text-red-500' : ''}`}>
                      {workflow.errorRate}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Description</p>
                    <p className="text-sm">{workflow.description}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Tags</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {workflow.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Execution History</CardTitle>
              <CardDescription>Last 7 days performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={executionHistory}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="successful" 
                      stackId="1"
                      stroke="#10b981" 
                      fill="#10b981" 
                      name="Successful"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="failed" 
                      stackId="1"
                      stroke="#ef4444" 
                      fill="#ef4444" 
                      name="Failed"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="executions" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Execution History</CardTitle>
              <CardDescription>
                Detailed execution logs will be displayed here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                Execution history details will be implemented in a future update
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Settings</CardTitle>
              <CardDescription>
                Configure workflow settings and triggers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                Settings configuration will be implemented in a future update
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkflowDetails;
