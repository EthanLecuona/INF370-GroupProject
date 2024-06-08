import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MaintenanceService {
  
  constructor(private http : HttpClient) { }

  private loaddata(res: Response) {
    let body = res;
    return body || {};
  }

  getMaintenance(): Observable<any>{
    return this.http.get(environment.apiUrl + 'Maintenance/getMaintenance').pipe(map(this.loaddata))
  }

  getMechanic(): Observable<any>{
    return this.http.get(environment.apiUrl + 'Maintenance/getMechanic').pipe(map(this.loaddata))
  }

  addMaintenance(maintenance){
   return this.http.post(environment.apiUrl + 'Maintenance/addMaintenance', maintenance)
  }

  deleteMaintenance(id){
   return this.http.delete(environment.apiUrl + 'Maintenance/deleteMaintenance?id=' + id) 
  }

  addMechanic(mechanic){
    return this.http.post(environment.apiUrl + 'Maintenance/addMechanic', mechanic)
  }

  deleteMechanic(id){
    return this.http.delete(environment.apiUrl + 'Maintenance/deleteMechanic?id=' + id)
  }

  sendEmail(email : {}){
   return this.http.post(environment.apiUrl + 'Maintenance/sendEmail' , email)
  }

  getMechanicAndMaintenance(): Observable<any>{
    return this.http.get(environment.apiUrl + 'Maintenance/getMaintenanceAndMechanic').pipe(map(this.loaddata))
  }

  getMaintenanceByID(id): Observable<any>{
    return this.http.get(environment.apiUrl + 'Maintenance/getMaintenanceByID?id=' + id).pipe(map(this.loaddata)).pipe(map(this.loaddata));
  }

  setAvailabilityTrue(id, av){
    this.http.put(environment.apiUrl + 'Maintenance/setAvailability?id=' + id, av).subscribe((res) => {
      console.log(res)
    })
  }

  confirmMaintenance(id,con){
    return this.http.put(environment.apiUrl + 'Maintenance/confirmMaintenance?id=' + id, con)
    // .subscribe(res =>{
    //   console.log(res)
    // })
  }
}
