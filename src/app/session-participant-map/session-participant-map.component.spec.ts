import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionParticipantMapComponent } from './session-participant-map.component';

describe('SessionParticipantMapComponent', () => {
  let component: SessionParticipantMapComponent;
  let fixture: ComponentFixture<SessionParticipantMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionParticipantMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionParticipantMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
