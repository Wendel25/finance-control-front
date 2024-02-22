import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCategoryProductComponent } from './register-category-product.component';

describe('RegisterCategoryProductComponent', () => {
  let component: RegisterCategoryProductComponent;
  let fixture: ComponentFixture<RegisterCategoryProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCategoryProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterCategoryProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
