//Defines a project, grouping tasks under specific projects
import { Task } from './task.model';

export interface Project {
  id: number;
  name: string;
  description?: string;
  tasks: Task[];
}
