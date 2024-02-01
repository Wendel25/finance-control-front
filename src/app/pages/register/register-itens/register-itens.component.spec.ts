import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterItensComponent } from './register-itens.component';

describe('RegisterItensComponent', () => {
  let component: RegisterItensComponent;
  let fixture: ComponentFixture<RegisterItensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterItensComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
