import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Task } from '../../../models/task.model';
import { Project } from '../../../models/project.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-viewer.component.html',
  styleUrls: ['./task-viewer.component.scss'],
})
export class TaskViewerComponent implements OnChanges {
  @Input() tasks: Task[] = [];
  @Input() projects: Project[] = [];
  @Output() taskClicked = new EventEmitter<Task>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['projects']) {
      console.log('Projects updated:', this.projects);
    }
  }

  isDueSoon(dueDate: string | Date | undefined): boolean {
    if (!dueDate) return false;

    const today = new Date();
    const due = new Date(dueDate);
    const diffInMs = due.getTime() - today.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    console.log(`Task due in ${diffInDays} days`);
    return diffInDays <= 2 && diffInDays >= 0;
  }

  isOverdue(dueDate: string | Date | undefined): boolean {
    if (!dueDate) return false;

    const today = new Date();
    const due = new Date(dueDate);
    return due < today;
  }

  onClick(task: Task) {
    this.taskClicked.emit(task);
  }

  getProjectName(projectId: number | string): string {
    const pid = Number(projectId);
    console.log('Looking for projectId:', pid);
    console.log('Available projects:', this.projects);

    const project = this.projects.find((p) => Number(p.projectId) === pid);
    console.log('Matched project:', project);

    return project ? project.name : 'Unknown Project';
  }
}
