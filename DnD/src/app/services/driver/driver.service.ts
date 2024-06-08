import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http : HttpClient, private router : Router, private toast : ToastController) { }

  private loaddata(res: Response) {
    let body = res;
    return body || {};
  }

  AddRating(rating){
    return this.http.post(environment.apiUrl + 'Driver/addRating', rating)
 
  }

  DeleteRating(id){
    return this.http.delete(environment.apiUrl + 'Driver/deleteRating?id=' + id)
   
  }

  GetAllRatings(): Observable<any>{
    return this.http.get(environment.apiUrl + 'Driver/getAllRating').pipe(map(this.loaddata))
  }

  GetRating(id): Observable<any>{
    return this.http.get(environment.apiUrl + 'Driver/getRating?id=' + id).pipe(map(this.loaddata)).pipe(map(this.loaddata));
  }

  getRatingByRating(id): Observable<any>{
    return this.http.get(environment.apiUrl + 'Driver/getRatingByRating?id=' + id).pipe(map(this.loaddata)).pipe(map(this.loaddata));
  }


  AddLicensCode(code){
    return this.http.post(environment.apiUrl + 'Driver/addLicenseCode', code)

  }

  DeleteLicensCode(id){
   return this.http.delete(environment.apiUrl + 'Driver/deleteLicenseCode?id=' + id)
 
  }

  GetAllLicensCode(): Observable<any>{
    return this.http.get(environment.apiUrl + 'Driver/getAllLicenseCode').pipe(map(this.loaddata))
  }

  GetLicenseCode(id): Observable<any>{
    return this.http.get(environment.apiUrl + 'Driver/getLicenseCode?id=' + id).pipe(map(this.loaddata)).pipe(map(this.loaddata));
  }


  DeleteLicense(id){
    return  this.http.delete(environment.apiUrl + 'Driver/deleteLicense?id=' + id)
 
  }

  DeleteDriverInfo(id){
    return this.http.delete(environment.apiUrl + 'Driver/deleteDriverInformation?id=' + id)
    
  }

  GetAllLicense(): Observable<any>{
    return this.http.get(environment.apiUrl + 'Driver/getAllLicense').pipe(map(this.loaddata))
  }

  GetLicense(id): Observable<any>{
    return this.http.get(environment.apiUrl + 'Driver/getLicense?id=' + id).pipe(map(this.loaddata)).pipe(map(this.loaddata));
  }


  GetAllDrivers(): Observable<any>{
    return this.http.get(environment.apiUrl + 'Driver/getDrivers').pipe(map(this.loaddata))
  }

  AddDriverRating(driverrating){
    return this.http.post(environment.apiUrl + 'Driver/addFriverRating', driverrating).pipe(map(this.loaddata)).subscribe(res =>{

    });
  }

  editLicenseCode(id, newCode){
   return this.http.put(environment.apiUrl + 'Driver/updateLicenseCode?id=' + id, newCode)

  }

  editLicense(id, newLicense){
    return this.http.put(environment.apiUrl + 'Driver/updateLicense?id=' + id, newLicense)
    
  }

  GetAllDriverRatings(){
    return this.http.get(environment.apiUrl + 'Driver/getAllDriverRating').pipe(map(this.loaddata))
  }

  addDriverInfor(newDriver){
   return this.http.post(environment.apiUrl + 'Driver/addDriverInformation', newDriver)

  }

  GetLicenseID(){
    return this.http.get(environment.apiUrl + 'Driver/getLicenseID').pipe(map(this.loaddata))
  }

  GetDriverRatingID(){
    return this.http.get(environment.apiUrl + 'Driver/getDriverRatingID').pipe(map(this.loaddata))
  }

  GetDriverRatingByID(id){
    return this.http.get(environment.apiUrl + 'Driver/getDriverRatingByID?id='+ id).pipe(map(this.loaddata))
  }

  editRating(id, newRating){
   return this.http.put(environment.apiUrl + 'Driver/updateRating?id=' + id, newRating)

  }

  getDriverInfo(): Observable<any>{
    return this.http.get(environment.apiUrl + 'Driver/getDriverInfo').pipe(map(this.loaddata))
  }

  getDriverLicense(id): Observable<any>{
    return this.http.get(environment.apiUrl + 'Driver/getDriverLicense?id='+ id).pipe(map(this.loaddata))
  }
 

  getAllDriverInfo(): Observable<any>{
    return this.http.get(environment.apiUrl + 'Driver/getAllDriverInformation').pipe(map(this.loaddata)).pipe(map(this.loaddata))
  }

  getAVDriverInfo(): Observable<any>{
    return this.http.get(environment.apiUrl + 'Driver/getAVDrivers1').pipe(map(this.loaddata)).pipe(map(this.loaddata))
  }


  getAvailableVehicles(): Observable<any>{
    return this.http.get(environment.apiUrl + 'Driver/getAvailableVehicles').pipe(map(this.loaddata)).pipe(map(this.loaddata))
  }

  getTrackingOnDate(bookingDay): Observable<any>{
    return this.http.get(environment.apiUrl + 'Tracking/getTrackingOnDate?date=' + bookingDay).pipe(map(this.loaddata))
  }

  getDriverRatings():Observable<any>{
    return this.http.get(environment.apiUrl + 'Driver/getDriverRatings').pipe(map(this.loaddata))
  }

  editDriverRating(id, newRating){
    return this.http.put(environment.apiUrl + 'Driver/editDriverRating?id=' + id, newRating)
  
  }

  driverRegister(driverRegister) {
    return this.http.post(environment.apiUrl + 'Logins/RegisterDriver', driverRegister)
  }

  lID
  rID
  newLicense : {}
  newDriverRating : {}
  newDriverInfo : {}
  licenseList : {}
  ratingList : {}

  async AddLicenseInfo(licenseForm){
     var licensecodeId = licenseForm['licensecodeId']
     var Description = licenseForm['description']
     var ExpirationDate = licenseForm['expDate']
     var LicenseNumber = licenseForm['licenseNumber']
     var RegistrationId = licenseForm['registrationId']
     
     this.newLicense = {
      licensecodeId : JSON.parse(licensecodeId),
      description : Description,
      expirationDate : ExpirationDate,
      licenseNumber : (LicenseNumber),
    }

    this.http.post(environment.apiUrl + 'Driver/addLicense', this.newLicense).subscribe(res => {
          console.log(res)
    }, (err : HttpErrorResponse) => {
      if(err.status === 400) {
        console.log('err')
      } else if (err.status === 200) {
        var ratingID = licenseForm['ratingId']
        var driverId = licenseForm['driverId']
        var date =  new Date().toISOString()
  
        this.newDriverRating = {
            RatingID : 6,
            DriverUserId : driverId,
            Date : date
          }  
        this.http.post(environment.apiUrl + 'Driver/addDriverRating', this.newDriverRating).subscribe((res) => {
          console.log(res)
  
        },(err : HttpErrorResponse) => {
          if(err.status === 400) {
           console.log("err")
          }
          if(err.status === 200) {
            this.newDriverInfo = {
              DriverUser_ID : driverId,
              DriverRating_ID : 1,
              License_ID : 1,
              Registration_ID : RegistrationId
            }
      
            console.log(this.newDriverInfo)
            this.http.post(environment.apiUrl + 'Driver/addDriverInformation', this.newDriverInfo).subscribe(res =>{
              console.log(res)
               
            },(err : HttpErrorResponse) => {
              if(err.status === 200) {
                this.router.navigate(['/driver']).then(() => {
                  this.presentToast()
                })
              }
              if(err.status === 400) {
                alert('Please make sure all maintenance info is filled in.')
              }
            })
          }
        })
      }
    })
  }

  
  async presentToast() {
    const toast = await this.toast.create({
      header: 'Vehicle Updated',
      message: 'The Vehicle model was updated successfully!',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }

}
