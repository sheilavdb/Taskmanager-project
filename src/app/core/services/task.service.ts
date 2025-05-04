import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../../models/task.model';
import { Project } from '../../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'https://dummyjson.com/c/adc8-a4d0-492c-8ed0';

  constructor(private http: HttpClient) {}

  private normalizeDate(date: Date): Date {
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);
    return normalizedDate;
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<{ projects: Project[] }>(this.apiUrl).pipe(
      map((response) =>
        response.projects.flatMap((project) =>
          project.tasks.map((task) => ({
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

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/tasks`, task);
  }
}
