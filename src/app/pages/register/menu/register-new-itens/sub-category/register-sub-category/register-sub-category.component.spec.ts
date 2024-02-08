import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSubCategoryComponent } from './register-sub-category.component';

describe('RegisterSubCategoryComponent', () => {
  let component: RegisterSubCategoryComponent;
  let fixture: ComponentFixture<RegisterSubCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterSubCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
