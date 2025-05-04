import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../../models/project.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'https://dummyjson.com/c/adc8-a4d0-492c-8ed0';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http
      .get<{ projects: Project[] }>(this.apiUrl)
      .pipe(map((response) => response.projects));
  }
}
