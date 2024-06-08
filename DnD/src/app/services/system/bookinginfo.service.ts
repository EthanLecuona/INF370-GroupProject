import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookinginfoService {

  constructor(private http: HttpClient) { }

  private loaddata(res: Response) {
    let body = res;
    return body || {};
  }

  getCanceledDate(bookingId) {
    return this.http.get(environment.apiUrl + 'Booking/getCanceledDate?bookingId='+ bookingId)
  }

  getComments(bookingId : Number){
    return this.http.get(environment.apiUrl + 'Comment/GetComments?bookingId='+ bookingId)
  }

  addComments(comment){
    return this.http.post(environment.apiUrl + 'Comment/AddComment', comment)
  }

  deleteComment(commentId){
    return this.http.delete(environment.apiUrl + "Comment/DeleteComment?com="+commentId)
  }

  addParcelConfident(newConfident) {
   return this.http.post(environment.apiUrl + 'ParcelConfidentialities/addParcelConfident', newConfident)
  }

  getParcelConfident(id) {
    return this.http.get(environment.apiUrl + 'ParcelConfidentialities/getParcelConfident?id=' + id).pipe(map(this.loaddata))
  }

  getAllParcelConfident() : Observable<any> {
    return this.http.get(environment.apiUrl + 'ParcelConfidentialities/GetAllParcelConfident').pipe(map(this.loaddata))
  }

  deleteParcelConfident(id) {
    return this.http.delete(environment.apiUrl + 'ParcelConfidentialities/deleteParcelConfident?id=' + id)
  }

  addParcelPriority(newPriority) {
   return this.http.post(environment.apiUrl + 'ParcelPriorities/addParcelPriority', newPriority)
  }

  getParcelPriority(id) {
    return this.http.get(environment.apiUrl + 'ParcelPriorities/getParcelPriority?id=' + id).pipe(map(this.loaddata))
  }

  getAllParcelPriority() : Observable<any> {
    return this.http.get(environment.apiUrl + 'ParcelPriorities/GetAllParcelPriorities').pipe(map(this.loaddata))
  }

  deleteParcelPriority(id) {
    return this.http.delete(environment.apiUrl + 'ParcelPriorities/deleteParcelPriority?id=' + id)
  }

  addParcelType(newType) {
   return this.http.post(environment.apiUrl + 'ParcelTypes/addParcelType', newType)
  }

  getParcelType(id) {
    return this.http.get(environment.apiUrl + 'ParcelTypes/getParcelType?id=' + id).pipe(map(this.loaddata))
  }

  getAllParcelType() : Observable<any> {
    return this.http.get(environment.apiUrl + 'ParcelTypes/GetAllParcelTypes').pipe(map(this.loaddata))
  }

  deleteParcelType(id) {
    return this.http.delete(environment.apiUrl + 'ParcelTypes/deleteParcelType?id=' + id)
  }
}
