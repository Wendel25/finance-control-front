import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeralExternalComponent } from './geral-external.component';

describe('GeralExternalComponent', () => {
  let component: GeralExternalComponent;
  let fixture: ComponentFixture<GeralExternalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeralExternalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeralExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
