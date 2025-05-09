import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewComponent } from './create-new.component';

describe('CreateNewComponent', () => {
  let component: CreateNewComponent;
  let fixture: ComponentFixture<CreateNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
