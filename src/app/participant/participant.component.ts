import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SessionType } from '../models/sessionTypeModel';
import { ParticipantService } from '../_service/participant.service';
import { SessionService } from '../_service/session.service';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit{

  sessionCatagoryList:any[]=[]; //SessionType[]=[];
  trainerList:any[]=[];
  title="Upload Participant details"
  
  constructor(private participantService:ParticipantService,
   private sessionService: SessionService,
   private toastrService:ToastrService

  ){}
  ngOnInit(){

    this.getSessionData();
  }
  uploadedFile:any;
  session={
    sessionDate:new Date(),
    sessionType:1,
    trainer:1
  }

 
  handleFileUpload(event:any){
    this.uploadedFile=event?.target?.files[0];
  }
  onSubmit(form:NgForm){
    const sessionData=form.value;

    const formData:FormData=new FormData();
    formData.append("uploadedFile",this.uploadedFile);
    formData.append("sessionDate", sessionData.sessionDate.toLocaleDateString());
    formData.append("sessionTypeId",sessionData.sessionType); //sessionData.sessionType
    formData.append("trainerId",sessionData.trainer);//sessionData.trainer

    this.participantService.UploadSessionData(formData).subscribe({
      next:(v)=>{
        this.toastrService.success('Data successfully saved', 'alert');
      },
      error:(e)=>{
        this.toastrService.error('Data not saved', 'alert');
      }
    })
    
  }

  singleParticipantSubmit(frmData:NgForm){

    const frmValue=frmData.value;

    const data={
      ParticipantId:0,
      name:frmValue.name,
      email:frmValue.email,
      isActive:frmValue.isActive==""?false:true
    }

    this.participantService.addSingleParticipant(data).subscribe({
      next:(res)=>{
        //console.log(res)
        this.toastrService.success('Data successfully saved', 'alert');
      },
      error:(err)=>{
        this.toastrService.error("Data not Saved");
      }
    })
    

  }

  getSessionData(){

    this.sessionCatagoryList=[]; //SessionType[]=[];
    this.trainerList=[];

    //populate session type Dropdown
    
    this.sessionService.getSessionType().subscribe({
      next:(data:any)=>{
        this.sessionCatagoryList= data
      }
    });

    //populate Trainer dropdown
    this.participantService.getParticipantListForDD().subscribe({
      next:(data)=> {
        this.trainerList=data;
      }
    })

  }
}
