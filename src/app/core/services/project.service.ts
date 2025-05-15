import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { Project } from '../../models/project.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'https://dummyjson.com/c/000d-3671-46cf-985f';
  private userProjects: Project[] = [];

  private projectCreated$ = new BehaviorSubject<Project | null>(null);
  private apiProjects$ = new BehaviorSubject<Project[]>([]);

  constructor(private http: HttpClient) {
    this.loadDefaultProjects();
  }

  //LoadAPI projects
  private loadDefaultProjects(): void {
    this.http
      .get<{ projects: Project[] }>(this.apiUrl)
      .pipe(
        map((res) => res.projects),
        catchError((err) => {
          console.error('Failed to load API projects:', err);
          return of([]);
        }),
        tap((projects) => this.apiProjects$.next(projects))
      )
      .subscribe();
  }

  //Combine API and usercreated projects
  getAllProjects(): Observable<Project[]> {
    return combineLatest([this.apiProjects$, of(this.userProjects)]).pipe(
      map(([apiProjects, localProjects]) => [...apiProjects, ...localProjects])
    );
  }

  // Emit a newly created project (frontend only)
  emitProjectCreated(project: Project): void {
    this.userProjects.push(project);
    this.projectCreated$.next(project);
  }

  getNextAvailableId(): number {
    const allProjects = [...this.apiProjects$.getValue(), ...this.userProjects];
    if (allProjects.length === 0) return 1;
    const ids = allProjects.map((p) => p.projectId);
    return Math.max(...ids) + 1;
  }
}
