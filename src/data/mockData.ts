import { Workflow, Folder, ExecutionHistory } from '../types/workflow';

export const mockFolders: Folder[] = [
  { id: 'all', name: 'All Workflows', count: 12 },
  { id: 'marketing', name: 'Marketing', count: 4 },
  { id: 'sales', name: 'Sales', count: 3 },
  { id: 'operations', name: 'Operations', count: 5 }
];

export const mockWorkflows: Workflow[] = [
  {
    id: '1',
    name: 'Lead Generation Workflow',
    status: 'active',
    lastRun: '2023-11-15T14:30:00Z',
    nextRun: '2023-11-16T14:30:00Z',
    folder: 'marketing',
    description: 'Automates lead capture from website forms and adds to CRM',
    executionCount: 1245,
    averageExecutionTime: 3.2,
    errorRate: 0.5,
    tags: ['leads', 'crm', 'website'],
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2023-11-15T14:30:00Z'
  },
  {
    id: '2',
    name: 'Invoice Processing',
    status: 'active',
    lastRun: '2023-11-15T12:00:00Z',
    nextRun: '2023-11-15T18:00:00Z',
    folder: 'operations',
    description: 'Processes incoming invoices and updates accounting system',
    executionCount: 892,
    averageExecutionTime: 5.7,
    errorRate: 1.2,
    tags: ['invoices', 'accounting', 'finance'],
    createdAt: '2023-02-10T09:00:00Z',
    updatedAt: '2023-11-15T12:00:00Z'
  },
  {
    id: '3',
    name: 'Customer Onboarding',
    status: 'error',
    lastRun: '2023-11-14T16:45:00Z',
    nextRun: '2023-11-15T16:45:00Z',
    folder: 'sales',
    description: 'Automates customer onboarding process after purchase',
    executionCount: 567,
    averageExecutionTime: 8.3,
    errorRate: 4.5,
    tags: ['customers', 'onboarding', 'sales'],
    createdAt: '2023-03-05T11:30:00Z',
    updatedAt: '2023-11-14T16:45:00Z'
  },
  {
    id: '4',
    name: 'Social Media Scheduler',
    status: 'inactive',
    lastRun: '2023-11-10T09:15:00Z',
    nextRun: null,
    folder: 'marketing',
    description: 'Schedules and posts content to social media platforms',
    executionCount: 423,
    averageExecutionTime: 2.1,
    errorRate: 0.8,
    tags: ['social', 'content', 'scheduling'],
    createdAt: '2023-04-20T13:45:00Z',
    updatedAt: '2023-11-10T09:15:00Z'
  },
  {
    id: '5',
    name: 'Inventory Management',
    status: 'active',
    lastRun: '2023-11-15T10:00:00Z',
    nextRun: '2023-11-16T10:00:00Z',
    folder: 'operations',
    description: 'Updates inventory levels and sends alerts for low stock',
    executionCount: 1876,
    averageExecutionTime: 4.5,
    errorRate: 0.3,
    tags: ['inventory', 'stock', 'alerts'],
    createdAt: '2023-01-05T08:30:00Z',
    updatedAt: '2023-11-15T10:00:00Z'
  },
  {
    id: '6',
    name: 'Email Campaign Tracker',
    status: 'active',
    lastRun: '2023-11-15T08:00:00Z',
    nextRun: '2023-11-16T08:00:00Z',
    folder: 'marketing',
    description: 'Tracks email campaign performance and updates dashboards',
    executionCount: 756,
    averageExecutionTime: 6.2,
    errorRate: 1.0,
    tags: ['email', 'campaigns', 'analytics'],
    createdAt: '2023-05-12T14:20:00Z',
    updatedAt: '2023-11-15T08:00:00Z'
  }
];

export const mockExecutionHistory: Record<string, ExecutionHistory[]> = {
  '1': [
    { date: '2023-11-09', successful: 24, failed: 1 },
    { date: '2023-11-10', successful: 22, failed: 0 },
    { date: '2023-11-11', successful: 25, failed: 0 },
    { date: '2023-11-12', successful: 23, failed: 2 },
    { date: '2023-11-13', successful: 26, failed: 0 },
    { date: '2023-11-14', successful: 24, failed: 1 },
    { date: '2023-11-15', successful: 25, failed: 0 }
  ],
  '2': [
    { date: '2023-11-09', successful: 12, failed: 0 },
    { date: '2023-11-10', successful: 12, failed: 1 },
    { date: '2023-11-11', successful: 12, failed: 0 },
    { date: '2023-11-12', successful: 12, failed: 0 },
    { date: '2023-11-13', successful: 12, failed: 2 },
    { date: '2023-11-14', successful: 12, failed: 0 },
    { date: '2023-11-15', successful: 12, failed: 0 }
  ],
  '3': [
    { date: '2023-11-09', successful: 8, failed: 0 },
    { date: '2023-11-10', successful: 8, failed: 0 },
    { date: '2023-11-11', successful: 8, failed: 1 },
    { date: '2023-11-12', successful: 8, failed: 0 },
    { date: '2023-11-13', successful: 7, failed: 1 },
    { date: '2023-11-14', successful: 6, failed: 2 },
    { date: '2023-11-15', successful: 0, failed: 8 }
  ]
};
