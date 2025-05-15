import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../../models/task.model';
import { Project } from '../../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'https://dummyjson.com/c/000d-3671-46cf-985f';

  // Subject for new task events
  private taskCreatedSource = new Subject<Task>();
  taskCreated$ = this.taskCreatedSource.asObservable();

  constructor(private http: HttpClient) {}

  // Normalize dates to remove time component
  private normalizeDate(date: Date): Date {
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);
    return normalizedDate;
  }

  // Fetch all tasks by flattening project structure
  getTasks(): Observable<Task[]> {
    return this.http.get<{ projects: Project[] }>(this.apiUrl).pipe(
      map((response) =>
        response.projects.flatMap((project) =>
          (project.tasks ?? []).map((task) => ({
            ...task,
            projectId: project.projectId,
            dueDate: task.dueDate
              ? this.normalizeDate(new Date(task.dueDate))
              : undefined,
          }))
        )
      )
    );
  }

  // Optional: Real API call to persist a new task
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/tasks`, task);
  }

  // Emit a task once (only called from TaskCreateComponent)
  emitTaskCreated(task: Task): void {
    console.log('[TaskService] Emitting task via Subject:', task);
    this.taskCreatedSource.next(task);
  }
}
