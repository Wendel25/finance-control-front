import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCategoryComponent } from './register-category.component';

describe('RegisterCategoryComponent', () => {
  let component: RegisterCategoryComponent;
  let fixture: ComponentFixture<RegisterCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
