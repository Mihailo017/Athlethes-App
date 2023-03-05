import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpTimeslotDialogComponent } from './sign-up-timeslot-dialog.component';

describe('SignUpTimeslotDialogComponent', () => {
  let component: SignUpTimeslotDialogComponent;
  let fixture: ComponentFixture<SignUpTimeslotDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpTimeslotDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpTimeslotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
