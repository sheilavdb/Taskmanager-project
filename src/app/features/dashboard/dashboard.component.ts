import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  showCompleted = false;

  tasks: Task[] = [
    {
      taskId: 1,
      projectId: 101,
      title: 'Design login page',
      status: 'not-started',
      priority: 'high',
      dueDate: new Date('2025-05-10'),
    },
    {
      taskId: 2,
      projectId: 101,
      title: 'Implement task list',
      status: 'completed',
      priority: 'medium',
    },
    {
      taskId: 3,
      projectId: 102,
      title: 'Write documentation',
      status: 'in-progress',
      priority: 'low',
    },
    {
      taskId: 4,
      projectId: 103,
      title: 'Build user profile page',
      status: 'not-started',
      priority: 'high',
    },
  ];

  // Filter properties
  filterStatus = '';
  filterPriority = '';
  filterTaskId: number | null = null;
  filterProjectId: number | null = null;
  filterTitle = '';

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
