import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ParticipantService } from '../_service/participant.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-session-participant-map',
  templateUrl: './session-participant-map.component.html',
  styleUrls: ['./session-participant-map.component.css']
})
export class SessionParticipantMapComponent implements OnInit {

  modalRef?: BsModalRef|null;

  constructor(private participantService:ParticipantService,
    private toastrService:ToastrService,
    private modalService:BsModalService
    ){}
  ngOnInit(): void {
    this.initilizeForm();
    this.getlistData();
    this.getParticipantList();
    
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  closeModal() {
    if (!this.modalRef) {
      return;
    }
 
    this.modalRef.hide();
    this.modalRef = null;
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
    this.closeModal();
    this.ngOnInit();//getParticipantList();
    
    this.toastrService.success("Data Successfully Saved");
  },
  error:(err)=> {
    this.toastrService.error("Data not Saved");
  },
})
  
}
}
