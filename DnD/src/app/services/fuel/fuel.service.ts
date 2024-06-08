import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


const url = 'https://localhost:44360/api/';
@Injectable({
  providedIn: 'root'
})
export class FuelService {

  constructor(private http: HttpClient) { }

  private loaddata(res: Response) {
    let body = res;
    return body || {};
  }

  addFuelPrice(FuelPrice) {
    return this.http.post(environment.apiUrl + 'FuelPrice/addFuelPrice', FuelPrice)
  }

  getFuelPrice(id){
    return this.http.get(environment.apiUrl + 'FuelPrice/getFuelPrice?id=' + id).pipe(map(this.loaddata))
  }

  getAllFuelPrice(): Observable<any>{
    return this.http.get(environment.apiUrl + 'FuelPrice/getAllFuelPrice').pipe(map(this.loaddata))
  }

  deleteFuelPrice(id){
    return this.http.delete(environment.apiUrl + 'FuelPrice/deleteFuelPrice?id='+ id)
    // .subscribe(res =>{
      
    // })
  }

  getFuelInfo():Observable<any>{
    return this.http.get(environment.apiUrl + 'FuelPrice/getDriverFuelInfo').pipe(map(this.loaddata))
  }

  getDriverFuelPrice(id): Observable<any>{
    return this.http.get(environment.apiUrl + 'FuelPrice/getDriverFuelPrice?id=' + id).pipe(map(this.loaddata))
  }
}
