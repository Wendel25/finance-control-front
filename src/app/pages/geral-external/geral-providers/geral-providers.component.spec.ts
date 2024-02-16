import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeralProvidersComponent } from './geral-providers.component';

describe('GeralProvidersComponent', () => {
  let component: GeralProvidersComponent;
  let fixture: ComponentFixture<GeralProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeralProvidersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeralProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
