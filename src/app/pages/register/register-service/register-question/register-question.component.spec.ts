import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterQuestionComponent } from './register-question.component';

describe('RegisterQuestionComponent', () => {
  let component: RegisterQuestionComponent;
  let fixture: ComponentFixture<RegisterQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
