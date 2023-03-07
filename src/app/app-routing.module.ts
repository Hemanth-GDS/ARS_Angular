import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParticipantListComponent } from './participant-list/participant-list.component';
import { ParticipantComponent } from './participant/participant.component';
import { SessionParticipantMapComponent } from './session-participant-map/session-participant-map.component';
import { SessionTypeComponent } from './session-type/session-type.component';

const routes: Routes = [
  {path:"participant",component:ParticipantComponent},
  {path:"participantList",component:ParticipantListComponent},
  {path:"sessionType",component:SessionTypeComponent},
  {path:"sessionParticipant",component:SessionParticipantMapComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
