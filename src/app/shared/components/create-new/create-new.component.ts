import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../models/task.model';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-create-new',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.scss'],
})
export class CreateNewComponent {
  @Input() type: 'task' | 'project' = 'task';
  @Output() itemCreated = new EventEmitter<Task | Project>();
  @Input() projects: Project[] = [];

  taskId: number = 0;
  projectId: number = 0;
  name: string = '';
  title: string = '';
  description?: string = '';
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high' = 'medium';
  status: 'not-started' | 'in-progress' | 'completed' = 'not-started';
  loading = false;
  errorMessage = '';

  onSubmit() {
    if (this.type === 'task') {
      const task: Task = {
        projectId: this.projectId,
        title: this.title,
        description: this.description,
        priority: this.priority,
        dueDate: this.dueDate,
        status: this.status,
        taskId: Number(`${this.projectId}${Math.floor(Math.random() * 100)}`),
      };
      this.itemCreated.emit(task);
    } else {
      const project: Project = {
        projectId: this.projectId,
        name: this.name,
        dueDate: this.dueDate,
        description: this.description,
        tasks: [],
      };
      this.itemCreated.emit(project);
    }
    this.successMessage =
      this.type === 'task' ? 'Task Created' : 'Project Created';
    this.resetForm();
  }

  private resetForm() {
    this.title = '';
    this.description = '';
    this.dueDate = undefined;
    this.priority = 'medium';
    this.status = 'not-started';
    this.projectId = 0;
    this.name = '';
  }

  successMessage: string = '';
}
