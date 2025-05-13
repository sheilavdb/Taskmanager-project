import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProjectService } from '../../../core/services/project.service';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss'],
})
export class ProjectCreateComponent {
  projectForm!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string = '';

  constructor(private fb: FormBuilder, private projectService: ProjectService) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      projectId: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      const newProject: Project = this.projectForm.value;

      this.projectService.createProject(newProject).subscribe({
        next: (project: Project) => {
          console.log('Project created:', project);
          this.successMessage = 'Project created successfully!';
          this.resetForm();
        },
        error: () => {
          this.errorMessage = 'Failed to create project. Try again later';
        },
      });
    }
  }

  resetForm(): void {
    this.projectForm.reset({
      name: '',
      description: '',
      dueDate: '',
      projectId: '',
    });
  }
}
