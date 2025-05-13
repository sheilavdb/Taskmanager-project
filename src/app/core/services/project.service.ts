import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../models/project.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'https://dummyjson.com/c/3642-1aa5-4286-9086'; // Replace with actual endpoint

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http
      .get<{ projects: Project[] }>(this.apiUrl)
      .pipe(map((response) => response.projects));
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);
  }
}
