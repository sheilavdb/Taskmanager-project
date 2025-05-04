//Definition of what a task looks like, used for creating, updating, displaying tasks in components and services

export interface Task {
  taskId: number;
  projectId: number;
  title: string;
  description?: string;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string | Date;
  status: 'not-started' | 'in-progress' | 'completed';
}
