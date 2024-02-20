import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationPersonLegalComponent } from './observation-person-legal.component';

describe('ObservationPersonLegalComponent', () => {
  let component: ObservationPersonLegalComponent;
  let fixture: ComponentFixture<ObservationPersonLegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObservationPersonLegalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ObservationPersonLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
