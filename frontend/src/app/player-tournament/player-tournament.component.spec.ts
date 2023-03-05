import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerTournamentComponent } from './player-tournament.component';

describe('PlayerTournamentComponent', () => {
  let component: PlayerTournamentComponent;
  let fixture: ComponentFixture<PlayerTournamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerTournamentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
