import { Task } from './task.model';
import { Project } from './project.model';

export interface AppState {
  tasks: Task[];
  projects: Project[];
  selectedProjectId: string | null;
  selectedTaskId: string | null;
  loading: boolean;
  error: string | null;
}
