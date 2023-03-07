import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ParticipantService } from '../_service/participant.service';

@Component({
  selector: 'app-session-participant-map',
  templateUrl: './session-participant-map.component.html',
  styleUrls: ['./session-participant-map.component.css']
})
export class SessionParticipantMapComponent implements OnInit {

  constructor(private participantService:ParticipantService,
    private toastrService:ToastrService){}
  ngOnInit(): void {
    this.initilizeForm();
    this.getlistData();
    this.getParticipantList();
    
  }
  interestFrm={
    participantId:0,
    sessionTypeId:[]
  }
title="Participant Session Mapping List"
  listData:any;
  participantList:any;
  interestFrmData:any;
  searchText:any={participant:""}
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];

  onTableDataChange(event: any) {
    this.page = event;
    this.getlistData();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getlistData();
  }

  initilizeForm(){
    this.interestFrmData={
      participantId:-1,
      angular:false,
      dotNet:false,
      azure:false
  
    }

  }

getlistData(){

  this.participantService.getParticipantInteresrMapping().subscribe({
    next:(v)=>{

      this.listData=v;
      console.log(this.listData)
    }
  })

}

getParticipantList(){
  
  this.participantService.getParticipantListForDD().subscribe({
    next:(data)=> {
      this.participantList=data;
    }
  })
}

addParticipantInterest(form:NgForm){

 const data=form.value;
console.log(data);
   const interestArray=[]
   if(data.angular) interestArray.push(1);
   if(data.dotNet) interestArray.push(2);
   if(data.azure) interestArray.push(3);

   const submittedFrm ={
    participantId:data.participantId,
    sessionTypeIds:interestArray
   }
  
  
this.participantService.addParticipantInterest(submittedFrm).subscribe({
  next:(v)=>{
    this.getParticipantList(),
    
    this.toastrService.success("Data Successfully Saved");
  },
  error:(err)=> {
    this.toastrService.error("Data not Saved");
  },
})
  
}
}
