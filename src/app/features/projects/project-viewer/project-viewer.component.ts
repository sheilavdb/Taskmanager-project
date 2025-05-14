import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Project } from '../../../models/project.model';
@Component({
  selector: 'app-project-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-viewer.component.html',
  styleUrls: ['./project-viewer.component.scss'],
})
export class ProjectViewerComponent {
  projects: Project[] = [];

  isDueSoon(dueDate: string | Date | undefined): boolean {
    if (!dueDate) return false;

    const today = new Date();
    const due = new Date(dueDate);
    const diffInMs = due.getTime() - today.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return diffInDays <= 3 && diffInDays >= 0; // due within 3 days
  }

  isOverdue(dueDate: string | Date | undefined): boolean {
    if (!dueDate) return false;

    const today = new Date();
    const due = new Date(dueDate);
    return due < today;
  }
}
