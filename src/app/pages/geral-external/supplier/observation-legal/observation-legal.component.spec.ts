import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationLegalComponent } from './observation-legal.component';

describe('ObservationLegalComponent', () => {
  let component: ObservationLegalComponent;
  let fixture: ComponentFixture<ObservationLegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObservationLegalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ObservationLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
