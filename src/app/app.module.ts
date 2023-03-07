import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ParticipantComponent } from './participant/participant.component';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import{HttpClientModule} from '@angular/common/http';
import { ParticipantListComponent } from './participant-list/participant-list.component';
import { CustomSearchPipe } from './shared/pipe/custom-search.pipe';
import { SessionTypeComponent } from './session-type/session-type.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { SessionParticipantMapComponent } from './session-participant-map/session-participant-map.component';
import { ToastrModule,ToastContainerModule  } from 'ngx-toastr';
import { CommonModalComponent } from './shared/common-modal/common-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    ParticipantComponent,
    ParticipantListComponent,
    CustomSearchPipe,
    SessionTypeComponent,
    SessionParticipantMapComponent,
    CommonModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDatepickerModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    FilterPipeModule,
    ToastrModule.forRoot(),
    ToastContainerModule ,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
