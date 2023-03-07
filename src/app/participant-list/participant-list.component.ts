import { Component,OnInit } from '@angular/core';
import { ParticipantService } from '../_service/participant.service';
import { sessionParticipant } from '../models/sessionParticipantModel';


@Component({
  selector: 'app-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.css']
})
export class ParticipantListComponent implements OnInit {

  listData:sessionParticipant[]=[]
  searchText:any={participant:""}
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];

  constructor(private participantService:ParticipantService) {

  }
  ngOnInit(): void {
    this.getParticipantList();
    //throw new Error('Method not implemented.');
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getParticipantList();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getParticipantList();
  }

  getParticipantList(){
    this.participantService.getSessionParticipantDetails().subscribe({
       next:(e)=>{
        this.listData=e;
      }
    })
  }
  

}




