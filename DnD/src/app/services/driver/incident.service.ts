import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  constructor(private http : HttpClient) { }

  private loaddata(res: Response) {
    let body = res;
    return body || {};
  }

  AddIncident(newIncident){
    return this.http.post(environment.apiUrl + 'Incident/addIncident', newIncident)
    // .subscribe(res =>{

    // })
  }

  DeleteIncident(id){
    this.http.delete(environment.apiUrl + 'Incident/deleteIncident?id=' + id).subscribe(res =>{

    })
  }

  GetAllIncidents(): Observable<any>{
    return this.http.get(environment.apiUrl + 'Incident/getAllIncident').pipe(map(this.loaddata))
  }

  GetDriverIncidents(id): Observable<any>{
    return this.http.get(environment.apiUrl + 'Incident/getDriverIncident?id='+id).pipe(map(this.loaddata))
  }

  GetIncident(id): Observable<any>{
    return this.http.get(environment.apiUrl + 'Incident/getIncident?id=' + id).pipe(map(this.loaddata))
  }

  EditIncident(id, updatedIncident){
    return this.http.put(environment.apiUrl + 'Incident/updateIncident?id=' + id, updatedIncident)
    // .subscribe(res =>{

    // })
  }

  AddIncidentStatus(newIncidentStatus){
    this.http.post(environment.apiUrl + 'Incident/addIncidentStatus', newIncidentStatus).subscribe(res =>{

    })
  }

  DeleteIncidentStatus(id){
    this.http.delete(environment.apiUrl + 'Incident/deleteIncidentStatus?id=' + id).subscribe(res =>{

    })
  }

  GetAllIncidentsStatus(): Observable<any>{
    return this.http.get(environment.apiUrl + 'Incident/getAllIncidentStatus').pipe(map(this.loaddata))
  }

  GetIncidentStatus(id): Observable<any>{
    return this.http.get(environment.apiUrl + 'Incident/getIncidentStatus?id=' + id).pipe(map(this.loaddata))
  }

  EditIncidentStatus(id, updatedIncidentStatus){
    this.http.put(environment.apiUrl + 'Incident/updateIncidentStatus?id=' + id, updatedIncidentStatus).subscribe(res =>{
      
    })
  }
}
