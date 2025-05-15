import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';
import { TaskService } from '../../core/services/task.service';
import { TaskViewerComponent } from '../tasks/task-viewer/task-viewer.component';
import { TaskDetailComponent } from '../../shared/components/task-detail/task-detail.component';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../core/services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TaskCreateComponent } from '../tasks/task-create/task-create.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TaskViewerComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  projects: Project[] = [];

  // Filter properties
  filterStatus = '';
  filterPriority = '';
  filterTaskId: number | null = null;
  filterProjectId: number | null = null;
  filterTitle = '';

  private taskCreatedSub!: Subscription;

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadTasks();
    this.loadProjects();
    // Subscribe to task creation events
    this.taskCreatedSub = this.taskService.taskCreated$.subscribe((newTask) => {
      console.log('[DashboardComponent] Received new task:', newTask);
      this.tasks.push(newTask); // Add to task list
    });
  }

  ngOnDestroy(): void {
    if (this.taskCreatedSub) {
      this.taskCreatedSub.unsubscribe();
    }
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        console.log('Fetched tasks:', tasks);
        this.tasks = tasks;
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      },
    });
  }

  loadProjects() {
    this.projectService.getAllProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
      },
      error: (err) => {
        console.error('Failed to load projects', err);
      },
    });
  }

  // Filter tasks based on selected filters
  filteredTasks() {
    return this.tasks.filter((task) => {
      const matchesStatus = this.filterStatus
        ? task.status === this.filterStatus
        : true;

      const matchesPriority = this.filterPriority
        ? task.priority === this.filterPriority
        : true;

      const matchesTaskId =
        this.filterTaskId !== null
          ? task.taskId.toString().startsWith(this.filterTaskId.toString())
          : true;

      const matchesProjectId =
        this.filterProjectId !== null
          ? task.projectId
              .toString()
              .startsWith(this.filterProjectId.toString())
          : true;

      const matchesTitle = this.filterTitle
        ? task.title.toLowerCase().includes(this.filterTitle.toLowerCase())
        : true;

      return (
        matchesStatus &&
        matchesPriority &&
        matchesTaskId &&
        matchesProjectId &&
        matchesTitle
      );
    });
  }
  clearFilters() {
    this.filterStatus = '';
    this.filterPriority = '';
    this.filterTaskId = null;
    this.filterTitle = '';
    this.filterProjectId = null;
  }

  openTaskDetails(task: Task) {
    const dialogRef = this.dialog.open(TaskDetailComponent, {
      data: { task: task, projects: this.projects },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.action === 'delete') {
        this.tasks = this.tasks.filter((t) => t.taskId !== result.taskId);
      }
      if (result?.action === 'edit') {
        this.loadProjects();
        // Open the edit form dialog
        const editDialogRef = this.dialog.open(TaskCreateComponent, {
          //use the create task form instead
          data: {
            task: result.task,
            projects: this.projects,
          },
        });

        editDialogRef.afterClosed().subscribe((updatedTask) => {
          console.log('[Dashboard] Edit dialog closed with', updatedTask);
          if (updatedTask) {
            // Replace the task in the list
            const index = this.tasks.findIndex(
              (t) => t.taskId === updatedTask.taskId
            );
            if (index > -1) {
              this.tasks = [
                ...this.tasks.slice(0, index),
                updatedTask,
                ...this.tasks.slice(index + 1),
              ];
            }
          }
        });
      }
    });
  }
}
