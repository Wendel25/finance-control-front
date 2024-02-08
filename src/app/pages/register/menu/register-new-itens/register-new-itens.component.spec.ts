import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNewItensComponent } from './register-new-itens.component';

describe('RegisterNewItensComponent', () => {
  let component: RegisterNewItensComponent;
  let fixture: ComponentFixture<RegisterNewItensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterNewItensComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterNewItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
