import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  showCompleted = false;

  tasks: Task[] = [];

  // Filter properties
  filterStatus = '';
  filterPriority = '';
  filterTaskId: number | null = null;
  filterProjectId: number | null = null;
  filterTitle = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe(
      (tasks) => {
        console.log('Fetched tasks:', tasks);
        this.tasks = tasks;
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
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
        this.filterTaskId !== null ? task.taskId === this.filterTaskId : true;

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
}
