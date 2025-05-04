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

  onSubmit() {
    if (this.type === 'task') {
      const task: Task = {
        taskId: this.taskId,
        projectId: this.projectId,
        title: this.title,
        description: this.description,
        priority: this.priority,
        dueDate: this.dueDate,
        status: this.status,
      };
      this.itemCreated.emit(task);
    } else {
      const project: Project = {
        projectId: this.projectId,
        name: this.name,
        description: this.description,
        tasks: [],
      };
      this.itemCreated.emit(project);
    }
  }
}
