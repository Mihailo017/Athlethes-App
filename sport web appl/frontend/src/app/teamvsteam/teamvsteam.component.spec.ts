import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamvsteamComponent } from './teamvsteam.component';

describe('TeamvsteamComponent', () => {
  let component: TeamvsteamComponent;
  let fixture: ComponentFixture<TeamvsteamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamvsteamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamvsteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
