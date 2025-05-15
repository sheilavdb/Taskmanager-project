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
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss'],
})
export class ProjectCreateComponent {
  projectForm!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string = '';
  initialFormValues: any;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private dialogRef: MatDialogRef<ProjectCreateComponent>
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
    });
    this.initialFormValues = this.projectForm.value;
  }

  onSubmit(): void {
    if (this.projectForm.invalid) return;

    const formValue = this.projectForm.value;
    const nextProjectId = this.projectService.getNextAvailableId();

    const project: Project = {
      name: formValue.name,
      dueDate: formValue.dueDate,
      description: formValue.description,
      projectId: nextProjectId, //Add the next number that is available
    };

    console.log('[ProjectCreateComponent] Emitting new project:', project);
    this.projectService.emitProjectCreated(project); //Send
    this.dialogRef.close(project);
    this.successMessage = 'Project created.';
  }

  close() {
    this.dialogRef.close();
  }

  resetForm(): void {
    this.projectForm.reset(this.initialFormValues);
  }
}
