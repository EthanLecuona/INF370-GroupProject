import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http : HttpClient) {}

  private loaddata(res: Response) {
    let body = res;
    return body || {};
  }

  getAllVehicles(): Observable<any> {
    return this.http.get(environment.apiUrl + 'Vehicles/GetAllVehicles').pipe(map(this.loaddata))
  }

  getVehcileAttributes(): Observable<any>{
    return this.http.get(environment.apiUrl + 'Vehicles/getAllVehiclesAndAttributes').pipe(map(this.loaddata))
  }

  sendVehicle(vehicle){
    return this.http.post(environment.apiUrl + 'Vehicles/addVehicle', vehicle)
    
  }

  getAllVehicleClassId(): Observable<any>{
    return this.http.get(environment.apiUrl + 'VehicleClasses/GetAllVehicleClasses').pipe(map(this.loaddata))
  }

  getVehicle(id): Observable<any> {
    return this.http.get(environment.apiUrl + 'Vehicles/getVehicle?id=' + id).pipe(map(this.loaddata)).pipe(map(this.loaddata));
  }

  deleteVehicle(id, inactive){
    console.log(inactive)
    return this.http.put(environment.apiUrl + 'Vehicles/deleteVehicle?id=' + id, inactive)
  }

  getVehicleClass(id): Observable<any>{
    return this.http.get(environment.apiUrl + 'VehicleClasses/GetVehicleClass?id=' + id).pipe(map(this.loaddata))
  }

  deleteVehicleClass(id){
   return this.http.delete(environment.apiUrl + "VehicleClasses/deleteVehicleClass?id=" + id)
  }
  editVehicle(id,updatedVehicle) {
    return this.http.put(environment.apiUrl + 'Vehicles/updateVehicles?id=' + id, updatedVehicle)
  }

  addVehicleClass(vehicleClass){
   return this.http.post(environment.apiUrl + 'VehicleClasses/addVehicleClass', vehicleClass)
  }

  getVehicleMake(): Observable<any>{
    return this.http.get(environment.apiUrl + 'Vehicles/GetAllVehicleMakes').pipe(map(this.loaddata))
  }

  getVehicleModel(): Observable<any>{
    return this.http.get(environment.apiUrl + 'Vehicles/GetAllVehicleModels').pipe(map(this.loaddata))
  }

  addVehicleMake(vehicleMake){
    return  this.http.post(environment.apiUrl + 'Vehicles/addVehicleMake', vehicleMake)
    
  }

  deleteVehicleMake(id){
   return this.http.delete(environment.apiUrl + 'Vehicles/deleteVehicleMake?id=' + id)
  
  }

  addVehicleModel(vehicleModel){
   return this.http.post(environment.apiUrl + 'Vehicles/addVehicleModel', vehicleModel)
 
  }

  deleteVehicleModel(id){
    return this.http.delete(environment.apiUrl + 'Vehicles/deleteVehicleModel?id=' + id)
  
  }

  getVehicleModelAndModel(): Observable<any>{
    return this.http.get(environment.apiUrl + 'Vehicles/getMakeAndModel').pipe(map(this.loaddata))
  }

  getModel(id): Observable<any>{
   return this.http.get(environment.apiUrl + 'Vehicles/getVehicleModel?id=' + id).pipe(map(this.loaddata))
  }

  getManufacturer(id): Observable<any>{
    return this.http.get(environment.apiUrl + 'Vehicles/getVehicleManufacturer?id=' + id).pipe(map(this.loaddata))
  }

  editModel(id, updatedModel){
   return this.http.put(environment.apiUrl + 'Vehicles/updateModel?id=' + id, updatedModel)
 
  }

  editManufacturer(id, updatedManufacurer){
 
    return this.http.put(environment.apiUrl + 'Vehicles/updateManufacturer?id=' + id, updatedManufacurer)
 
  }

  getModByManId(id): Observable<any>{
    return this.http.get(environment.apiUrl + 'Vehicles/getVehicleModelByManufacturerId?id=' + id).pipe(map(this.loaddata))
  }

  getManufacturerByName(id): Observable<any>{
    return this.http.get(environment.apiUrl + 'Vehicles/getVehicleManufacturerByName?id=' + id).pipe(map(this.loaddata))
  }

  getModelByName(id): Observable<any>{
    return this.http.get(environment.apiUrl + 'Vehicles/getVehicleModelName?id=' + id).pipe(map(this.loaddata))
  }

  getClassByName(id): Observable<any>{
    return this.http.get(environment.apiUrl + 'VehicleClasses/getVehicleClassName?id=' + id).pipe(map(this.loaddata))
  }  

  setVehicleAvailabilityTrue(id, avTrue) {
    this.http.put(environment.apiUrl + 'Vehicles/setAvailabilityTrue?id=' + id, avTrue).subscribe((res) => {
      console.log(res)
    })
  }

  setVehicleAvailabilityFalse(id, avFalse) {
    this.http.put(environment.apiUrl + 'Vehicles/setAvailabilityFalse?id=' + id, avFalse).subscribe((res) => {
      console.log(res)
    })
  }
}
