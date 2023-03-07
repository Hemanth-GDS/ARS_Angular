import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from '../_service/session.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-session-type',
  templateUrl: './session-type.component.html',
  styleUrls: ['./session-type.component.css']
})
export class SessionTypeComponent implements OnInit{

  title="Session Type List"
  
  modalRef?: BsModalRef|null;
  listData:any;
  formData:any={
    sesstonType:"",
    isActive:false
  }

  constructor(private session:SessionService,
    private toastrService:ToastrService,
    private modalService:BsModalService
    ){}
  ngOnInit(): void {
    this.getSessionType();
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
  // closeModal(modalId?: number){
  //   this.modalService.hide(modalId);
  // }
  

  getSessionType(){
    this.session.getSessionType().subscribe({
      next:(e)=>{this.listData=e}
    })
  }
  onSubmit(form:NgForm){
    const data=form.value;
    // const frmData:FormData=new FormData();
    // frmData.append("name",data.sessionType);
    // frmData.append("isActive",data.isActive);
    // frmData.append("id",'0')
   const frmData={
      id:0,
      name:data.sessionType,
      isActive:data.isActive
    }

    this.session.addSessionType(frmData).subscribe({
      next:(v)=>{
        this.toastrService.success("Data Successfully Saved");
      },
      error:(err)=>{
        this.toastrService.error("Data not Saved");
      }
    })
      this.closeModal();
      this.ngOnInit();
  }

  
}
