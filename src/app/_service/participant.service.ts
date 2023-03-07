import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {sessionParticipant,participantSession} from '../models/sessionParticipantModel'
import {Participant} from '../models/participantModel'
import { ReturnStatement } from '@angular/compiler';
import { isObjectEmpty } from 'ngx-bootstrap/chronos/utils/type-checks';
@Injectable({
  providedIn: 'root'
})
export class ParticipantService {


  constructor(private http:HttpClient) {}

   BaseUrl="https://localhost:7130/api/";

  getHeader(){
    const header= new HttpHeaders()
    //.set('Content-Type', 'multipart/form-data')
    .set('Access-Control-Allow-Origin', '*');
    var option= {headers:header}
    return option;
  }


  UploadSessionData(data:any){
    const url=this.BaseUrl+"SessionParticipantsMapping/AddAttendenceFromFile";

    return this.http.post(
     // "https://localhost:7129/api/FileUpload",
      url,
      data,
      // {headers:new HttpHeaders()}
      this.getHeader()
    ).pipe(
      map((res:any)=>res)
    )

  }
 

  getSessionParticipantDetails(){
     //sessionList:sessionParticipant[]=[];
    //const sessionDetails:sessionParticipant;

    const url=this.BaseUrl+"SessionParticipantsMapping/GetDetails";

    return this,this.http.get(url).pipe(
      map((res:any)=>res
    ));
    
  }
  participants:Participant[]=[]
  getParticipantListForDD():Observable<Participant[]>{
    const url=this.BaseUrl+"Participant";
    return this.http.get<Participant[]>(url)
  }

  getParticipantInteresrMapping(){
    const url=this.BaseUrl+"ParticipantIntrests/GetParticipantInterest";

    return this.http.get(url).pipe( 
      map((res:any)=>{
        const output:participantSession[]=[];
        for(let i=0;i<res.length;i++){
          output.push({
            participant:res[i].participant,
            angular:res[i].participantIntrests.includes("Angular"),
            dotNet:res[i].participantIntrests.includes("dotNet"),
            azure:res[i].participantIntrests.includes("Azure"),
          });
        }
       

        return output;
      })
    )
  
}

addParticipantInterest(data:any){

 const url= this.BaseUrl+"ParticipantIntrests/AddMultiple?participantId="+data.participantId;
 return this.http.post(
   url,
   data.sessionTypeIds,
   this.getHeader()
 )

}
addSingleParticipant(data:any){
  const url= this.BaseUrl+"Participant";
 return this.http.post(
   url,
   data,
   this.getHeader()
 )

}
}
