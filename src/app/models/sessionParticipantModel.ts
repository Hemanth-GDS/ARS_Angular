export interface sessionParticipant{
    id:number,
    sessionName:string,
    date:Date,
    trainerName:string,
    sessionType: string,
    participant:string

  }

export interface participantSession{
  participant:string,
  angular:boolean,
  dotNet:boolean,
  azure:boolean
}