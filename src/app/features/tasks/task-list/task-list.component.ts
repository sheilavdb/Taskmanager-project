import { Component, Input } from '@angular/core';
import { Task } from '../../../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskComponent {
  @Input() task: Task | undefined;
}
