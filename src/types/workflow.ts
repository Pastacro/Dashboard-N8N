export interface Workflow {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'error';
  folder: string | null;
  lastRun: string;
  executionCount: number;
  errorRate: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
  nodes?: WorkflowNode[];
  connections?: WorkflowConnection[];
  executions?: WorkflowExecution[];
}

export interface WorkflowNode {
  id: string;
  name: string;
  type: string;
  position: { x: number; y: number };
  parameters?: Record<string, any>;
}

export interface WorkflowConnection {
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
}

export interface WorkflowExecution {
  id: string;
  status: 'success' | 'error' | 'running';
  startedAt: string;
  finishedAt?: string;
  duration?: number;
  error?: string;
}

export interface Folder {
  id: string;
  name: string;
  color?: string;
  workflowCount?: number;
}

export interface ApiCredentials {
  apiUrl: string;
  apiKey: string;
}
