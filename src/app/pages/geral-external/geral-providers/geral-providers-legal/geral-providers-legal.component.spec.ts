import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeralProvidersLegalComponent } from './geral-providers-legal.component';

describe('GeralProvidersLegalComponent', () => {
  let component: GeralProvidersLegalComponent;
  let fixture: ComponentFixture<GeralProvidersLegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeralProvidersLegalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeralProvidersLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
