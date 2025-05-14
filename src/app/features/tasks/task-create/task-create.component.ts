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
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task-create',
  standalone: true,
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
})
export class TaskCreateComponent implements OnInit {
  taskForm!: FormGroup;
  projects: Project[] = [];
  loading = false; //track loading status
  errorMessage: string | null = null; //display error message
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private taskService: TaskService,
    private dialogRef: MatDialogRef<TaskCreateComponent>
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadProjects();
  }

  private initForm(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      priority: ['medium', Validators.required],
      dueDate: [''], // Date picker or input
      status: ['not-started', Validators.required],
      projectId: ['', Validators.required],
    });
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

    const task: Task = {
      projectId: formValue.projectId,
      title: formValue.title,
      description: formValue.description,
      priority: formValue.priority,
      dueDate: formValue.dueDate,
      status: formValue.status,
      taskId: Number(
        `${formValue.projectId}${Math.floor(Math.random() * 1000)}`
      ),
    };

    console.log('[TaskCreateComponent] Emitting new task:', task);
    this.taskService.emitTaskCreated(task); // Send to listeners
    this.dialogRef.close(task); // Close dialog and return new task
    this.successMessage = 'Task created.';
  }
}
