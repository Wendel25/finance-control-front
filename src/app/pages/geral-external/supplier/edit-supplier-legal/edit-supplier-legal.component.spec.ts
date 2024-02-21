import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSupplierLegalComponent } from './edit-supplier-legal.component';

describe('EditSupplierLegalComponent', () => {
  let component: EditSupplierLegalComponent;
  let fixture: ComponentFixture<EditSupplierLegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSupplierLegalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSupplierLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
