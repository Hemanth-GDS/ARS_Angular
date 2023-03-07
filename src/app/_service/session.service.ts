import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { SessionType } from '../models/sessionTypeModel';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
 BasUrl:string="https://localhost:7130/api/"
  constructor(private http:HttpClient) {}

  getHeader(){

    const header= new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Accept', 'application/json');
   
    var option= {headers:header}
    return option;
  }

  getSessionType(){
   return this.http.get(this.BasUrl+"SessionType").pipe(
    map((e)=>e)
   )
  }
  addSessionType(data:any){
   // console.log(JSON.stringify(data));
    const url=this.BasUrl+"SessionType"
    return this.http.post(
      url,
      data,
     // JSON.stringify(data),
      this.getHeader()).pipe(
      map((res)=>res)
    )

  }
}
