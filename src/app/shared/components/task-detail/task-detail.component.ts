import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Task } from '../../../models/task.model';
import { Project } from '../../../models/project.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent implements OnInit {
  task!: Task;
  project!: Project | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { task: Task; projects: Project[] },
    private dialogRef: MatDialogRef<TaskDetailComponent>
  ) {}

  ngOnInit(): void {
    this.task = this.data.task;

    // Find the project this task belongs to
    this.project = this.data.projects.find(
      (proj) => Number(proj.projectId) === Number(this.task.projectId)
    );

    if (!this.project) {
      console.warn(
        `[TaskDetailComponent] Could not find project with ID ${this.task.projectId}`
      );
    }
  }

  get projectName(): string {
    return this.project?.name ?? 'Unknown';
  }

  closeDialog() {
    this.dialogRef.close();
  }

  deleteTask() {
    this.dialogRef.close({ action: 'delete', taskId: this.task.taskId });
  }

  editTask() {
    this.dialogRef.close({ action: 'edit', task: this.task });
  }
}
