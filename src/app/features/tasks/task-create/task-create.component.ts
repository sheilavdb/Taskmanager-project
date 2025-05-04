import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-task-create',
  standalone: true,
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class TaskCreateComponent implements OnInit {
  taskForm!: FormGroup;
  projects: Project[] = [];
  loading = false; //track loading status
  errorMessage: string | null = null; //display error message

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private projectService: ProjectService
  ) {
    // Create a reactive form to add a new task
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      priority: ['medium', Validators.required],
      dueDate: ['', Validators.required], // Date picker or input
      status: ['not-started', Validators.required],
      projectId: ['', Validators.required],
    });
  }

  /*ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects: Project[]) => {
      this.projects = projects;
    });
  }*/

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loading = true; // Set loading to true while fetching data
    this.projectService.getProjects().subscribe(
      (projects: Project[]) => {
        this.projects = projects;
        this.loading = false; // Set loading to false once data is fetched
      },
      (error) => {
        this.loading = false;
        this.errorMessage = 'Failed to load projects. Please try again later.'; // Show error message if API fails
      }
    );
  }

  // On form submit, create a new task
  onSubmit() {
    if (this.taskForm.valid) {
      const newTask: Task = this.taskForm.value;

      if (newTask.dueDate) {
        const normalizedDate = new Date(newTask.dueDate);
        normalizedDate.setHours(17, 0, 0, 0); // Set time to 17:00
        newTask.dueDate = normalizedDate;
      }

      this.taskService.createTask(newTask).subscribe(
        (task) => {
          console.log('Task created:', task);
          // You could also redirect to a task list or reset the form
          this.resetForm(); //Reset form after task creation
        },
        (error) => {
          this.errorMessage = 'Failed to create task. Try again later';
        }
      );
    }
  }

  resetForm(): void {
    this.taskForm.reset({
      priority: 'medium',
      status: 'not-started',
    });
  }
}
