import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { TaskService } from '../../../core/services/task.service';
import { ProjectService } from '../../../core/services/project.service';
import { Task } from '../../../models/task.model';
import { Project } from '../../../models/project.model';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-create',
  standalone: true,
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
  ],
})
export class TaskCreateComponent implements OnInit {
  taskForm!: FormGroup;
  isEditMode = false;
  projects: Project[] = [];
  loading = false; //track loading status
  errorMessage: string | null = null; //display error message
  successMessage = '';
  initialFormValues: any;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private taskService: TaskService,
    private dialogRef: MatDialogRef<TaskCreateComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { task?: Task; projects?: Project[] }
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.data?.task;
    this.initForm();

    if (this.data?.projects) {
      this.projects = this.data.projects;
    } else {
      this.loadProjects();
    }
  }

  private initForm(): void {
    const task = this.data?.task;

    this.taskForm = this.fb.group({
      title: [task?.title || '', Validators.required],
      description: [task?.description || ''],
      priority: [task?.priority || 'medium', Validators.required],
      dueDate: [task?.dueDate || ''],
      status: [task?.status || 'in-progress', Validators.required],
      projectId: [task?.projectId || '', Validators.required],
    });
    this.initialFormValues = this.taskForm.value;
  }

  private loadProjects(): void {
    this.loading = true; // Set loading to true while fetching data
    this.projectService.getAllProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.loading = false; // Set loading to false once data is fetched
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Failed to load projects. Please try again later.'; // Show error message if API fails
      },
    });
  }

  // On form submit, create a new task
  onSubmit(): void {
    if (this.taskForm.invalid) return;

    const formValue = this.taskForm.value;

    const updatedTask: Task = {
      ...this.data?.task, //reuse TaskId if editing
      projectId: formValue.projectId,
      title: formValue.title,
      description: formValue.description,
      priority: formValue.priority,
      dueDate: formValue.dueDate,
      status: formValue.status,
      taskId:
        this.data?.task?.taskId ||
        Number(`${formValue.projectId}${Math.floor(Math.random() * 1000)}`),
    };

    if (this.isEditMode) {
      console.log('[TaskCreate] Closing with updated task:', updatedTask);
      this.dialogRef.close(updatedTask); // return updated task
    } else {
      this.taskService.emitTaskCreated(updatedTask); // notify others
      this.dialogRef.close(updatedTask); // close with created task
      this.successMessage = 'Task created.';
    }
  }

  close() {
    this.dialogRef.close();
  }

  resetForm(): void {
    this.taskForm.reset(this.initialFormValues);
  }
}
