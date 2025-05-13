import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskCreateComponent } from '../../../features/tasks/task-create/task-create.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../../services/task.service';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private dialog: MatDialog, private taskService: TaskService) {}

  openCreateTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskCreateComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((newTask) => {
      if (newTask) {
        console.log('[HeaderComponent] Received new task:', newTask);
      }
    });
  }
}
