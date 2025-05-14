import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectViewerComponent } from './project-viewer.component';

describe('ProjectViewerComponent', () => {
  let component: ProjectViewerComponent;
  let fixture: ComponentFixture<ProjectViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
