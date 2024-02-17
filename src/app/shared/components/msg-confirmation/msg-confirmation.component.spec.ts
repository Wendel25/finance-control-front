import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgConfirmationComponent } from './msg-confirmation.component';

describe('MsgConfirmationComponent', () => {
  let component: MsgConfirmationComponent;
  let fixture: ComponentFixture<MsgConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MsgConfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MsgConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
