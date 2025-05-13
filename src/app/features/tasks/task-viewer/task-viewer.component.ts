import { Component, Input } from '@angular/core';
import { Task } from '../../../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-viewer.component.html',
  styleUrls: ['./task-viewer.component.scss'],
})
export class TaskViewerComponent {
  @Input() tasks: Task[] = [];
}
