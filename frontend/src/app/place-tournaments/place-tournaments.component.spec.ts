import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceTournamentsComponent } from './place-tournaments.component';

describe('PlaceTournamentsComponent', () => {
  let component: PlaceTournamentsComponent;
  let fixture: ComponentFixture<PlaceTournamentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaceTournamentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceTournamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
