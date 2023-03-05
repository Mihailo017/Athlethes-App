import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSignUpDialogComponent } from './team-sign-up-dialog.component';

describe('TeamSignUpDialogComponent', () => {
  let component: TeamSignUpDialogComponent;
  let fixture: ComponentFixture<TeamSignUpDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamSignUpDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamSignUpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
