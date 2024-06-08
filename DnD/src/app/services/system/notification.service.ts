import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const baseUrl = 'https://onesignal.com/api/v1/notifications'
const headerDict = {
  'Content-Type': 'application/json',
  'Authorization' : environment.oneSignalApiKey
}

const requestOptions = {                                                                                                                                                                                 
  headers: new HttpHeaders(headerDict), 
};

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  currentDate = new Date().toISOString()
  private loaddata(res: Response) {
    let body = res;
    return body || {};
  }

  constructor(private httpClient: HttpClient) { }

  sendNotification(senderId, receiverId, message) {
    var users = []
    users.push(senderId)
    users.push(receiverId)
    var body = {
      app_id : environment.oneSignalKey,
      include_external_user_ids : users,
      channel_for_external_user_ids : 'push',
      contents : {'en' : message}
    }
    this.httpClient.post(baseUrl, body, requestOptions).subscribe(res => {
      console.log(res)
    })
  }

  updateBookingStatusDriver(bookingId) {
    return this.httpClient.put(environment.apiUrl + 'Booking/updateBookingStatusDriver?bookingId='+ bookingId, bookingId).pipe(map(this.loaddata))
  }

  updateBookingStatusReceiver(bookingId) {
    return this.httpClient.put(environment.apiUrl + 'Booking/updateBookingStatusReceiver?bookingId='+ bookingId, bookingId).pipe(map(this.loaddata))
  }

  preInspection(images, checkedTires, InspectionForm, userId) {
    var data = {
      driverUserId: userId,
      startDate: this.currentDate,
      preCarInspection: images,
      preCarOdometer: InspectionForm.controls['preInspectionOdometer'].value,
      preCarTyres: checkedTires,
      preCarNotes: InspectionForm.controls['preInspectionNotes'].value
     }
    return this.httpClient.post(environment.apiUrl + 'Inspection/addpreInspection', data)
  }

  postInspection(images, checkedTires, InspectionForm, userId) {
    var data = {
      driverUserId: userId,
      endDate: this.currentDate,
      postCarInspection: images,
      postCarOdometer: InspectionForm.controls['postInspectionOdometer'].value,
      postCarTyres: checkedTires,
      postCarNotes: InspectionForm.controls['postInspectionNotes'].value
     }
     return this.httpClient.put(environment.apiUrl + 'Inspection/addpostInspection', data)
  }

  updateDriverLocation(lat, lng) {
    var data = {
      lat : lat,
      lng : lng
    }
    return this.httpClient.put(environment.apiUrl + 'Tracking/UpdateDriverLocation?id=1',data)
  }

  getLatLng(address) {
    return this.httpClient.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + environment.googleMapsKey)
  }

  getDriverLoaction() {
    return this.httpClient.get(environment.apiUrl + 'Tracking/GetDriverLocationByID?id=1')
  }
}