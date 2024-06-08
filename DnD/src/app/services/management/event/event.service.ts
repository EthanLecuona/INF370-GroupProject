import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from 'src/app/shared/project';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  events: {}
  viewEvent: Event[]=[]

  constructor(public httpClient : HttpClient, private sqlite: SQLite, sqlPort: SQLitePorter) { 

  }

  private loaddata(res: Response) {
    let body = res;
    return body || {};
  }

  getEvent(id){
    return this.httpClient.get(environment.apiUrl + 'Events/getEvent?id=' + id).pipe(map(this.loaddata))
  }

  getAllEvents(): Observable<any>{
    return this.httpClient.get(environment.apiUrl + 'Events/GetAllEvents').pipe(map(this.loaddata))
  }

  updateEvent(id, updatedEvent){
    return this.httpClient.put(environment.apiUrl + 'Events/updateEvent?id=' + id, updatedEvent)
  }

  addEvent(event) {
    return this.httpClient.post(environment.apiUrl + 'Events/addEvent', event)
  }

  deleteEvent(id){
    return this.httpClient.delete(environment.apiUrl + 'Events/deleteEvent?id=' + id)
  }

  checkDeleteEvent(eventId) {
    return this.httpClient.get(environment.apiUrl + 'Events/checkEventBooking?id=' + eventId)
  }

  deleteTransportBooking(bookingId) {
    return this.httpClient.put(environment.apiUrl + 'Events/deleteTansportBooking?bookingId=' + bookingId, bookingId)
  }

  addNewTransportEvent(data) {
    return this.httpClient.post(environment.apiUrl + 'Events/addNewTransportBooking', data)
  }

  addExistingTransportEvent(data,id) {
    return this.httpClient.post(environment.apiUrl + 'Events/addExistingTransportBooking?eventId=' + id,data)
  }

  getTransportBookings(empId) {
    return this.httpClient.get(environment.apiUrl + 'Events/getTransportBookings?empId=' + empId).pipe(map(this.loaddata))
  }
}
