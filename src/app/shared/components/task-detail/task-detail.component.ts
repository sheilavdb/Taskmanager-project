import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class TaskDetailComponent {
  editMode = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public task: Task,
    private dialogRef: MatDialogRef<TaskDetailComponent>
  ) {}

  close() {
    this.dialogRef.close();
  }

  deleteTask() {
    // trigger deletion logic here or emit event
    this.dialogRef.close({ action: 'delete', taskId: this.task.taskId });
  }

  editTask() {
    // open edit form or emit event
    this.editMode = true;
    this.dialogRef.close({ action: 'edit', task: this.task });
  }
}
