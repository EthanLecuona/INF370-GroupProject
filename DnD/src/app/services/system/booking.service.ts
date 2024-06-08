import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  private loaddata(res: Response) {
    let body = res;
    return body || {};
  }

  //Api Post methods
  createBooking(bookingInfo) {
    return this.http.post(environment.apiUrl + 'Booking/createBooking', bookingInfo)
  }

  addParcelConfident(ParcelCon) {
    this.http.post(environment.apiUrl + 'ParcelConfidentialities/addParcelConfident', ParcelCon).subscribe((res) => {
      console.log(res)
    })
  }

  addParcelPriority(ParcelPrio) {
    this.http.post(environment.apiUrl + 'ParcelPriorities/addParcelPriority', ParcelPrio).subscribe((res) => {
      console.log(res)
    })
  }

  addParcelType(ParcelType) {
    this.http.post(environment.apiUrl + 'ParcelTypes/addParcelType', ParcelType).subscribe((res) => {
      console.log(res)
    })
  }

  deleteBooking(bookingId, fined) {
    return this.http.put(environment.apiUrl + 'Booking/deleteBooking?bookingId=' + bookingId + '&fined=' + fined, fined)
  }

  addBookingCancellation(bookingId, cancelledDate, cancelledDescription) {
    var data = {
      bookingId : bookingId,
      cancelledDate : cancelledDate,
      cancelledDescription : cancelledDescription
    }
    return this.http.post(environment.apiUrl + 'Booking/addBookingCancellation', data)
  }

  addToDriverSchedule(newBooking) {
    return this.http.post(environment.apiUrl + 'DriverSchedule/addToSchedule', newBooking)
  }

  getDirectionsFromEPI(destination) {
    return this.http.get(`https://maps.googleapis.com/maps/api/directions/json?destination=${destination}&origin=46 Ingersol Rd, Lynnwood Glen, Pretoria, 0081&key=${environment.googleMapsKey}`)
  }

  getDirectionsToEPI(destination) {
    return this.http.get(`https://maps.googleapis.com/maps/api/directions/json?destination=46 Ingersol Rd, Lynnwood Glen, Pretoria, 0081&origin=${destination}&key=${environment.googleMapsKey}`)
  }
 
  getAllConfidentId() {
    return this.http.get(environment.apiUrl + 'ParcelConfidentialities/GetAllParcelConfident').pipe(map(this.loaddata))
  }

  getAllPriorityId() {
    return this.http.get(environment.apiUrl + 'ParcelPriorities/GetAllParcelPriorities').pipe(map(this.loaddata))
  }

  getAllTypeId() {
    return this.http.get(environment.apiUrl + 'ParcelTypes/GetAllParcelTypes').pipe(map(this.loaddata))
  }

  getClientNameCompanyName(empId) {
    return this.http.get(environment.apiUrl + 'ClientInformation/getClientNameCompanyName?empId=' + empId).pipe(map(this.loaddata))
  }

  getConfidentbyId(confidentId) {
    return this.http.get(environment.apiUrl + 'ParcelConfidentialities/getParcelConfident?id=' + confidentId).pipe(map(this.loaddata))
  }
  
  getPrioritybyId(PriorityId) {
    return this.http.get(environment.apiUrl + 'ParcelPriorities/getParcelPriority?id=' + PriorityId).pipe(map(this.loaddata))
  }

  getTypebyId(TypeId) {
    return this.http.get(environment.apiUrl + 'ParcelTypes/getParcelType?id=' + TypeId).pipe(map(this.loaddata))
  }

  getEmployeeClientCompanies(empID : string) {
    return this.http.get(environment.apiUrl + 'Booking/getClientCompany?USERID=' + empID).pipe(map(this.loaddata))
  }

  getBookingDetails() {
    return this.http.get(environment.apiUrl + 'Booking/getParcelBooking').pipe(map(this.loaddata));
  }

  getAllBookings(): Observable<any> {
    return this.http.get(environment.apiUrl + 'Booking/GetAllBookings').pipe(map(this.loaddata));
  }

  getClientCompany(userId) {
    return this.http.get(environment.apiUrl + 'ClientInformation/getClientCompany?ClientID=' + userId).pipe(map(this.loaddata))
  }

  getClientCompanyByClientId(clientId) {
    return this.http.get(environment.apiUrl + 'Booking/getClientCompanyByClientId?ClientId=' + clientId).pipe(map(this.loaddata))
  }

  getClientEmployeeConnection(cecId : number) {
    return this.http.get(environment.apiUrl + 'ClientEmployee/GetClientEmployeeById?id=' + cecId).pipe(map(this.loaddata))
  }

  getClientEmployee(clientID : string) {
    return this.http.get(environment.apiUrl + 'Booking/getClientEmployee?ClientID=' + clientID).pipe(map(this.loaddata))
  }

  getEmployeeClient(empID : string) {
    return this.http.get(environment.apiUrl + 'Booking/getEmployeeClients?UserId=' + empID).pipe(map(this.loaddata))
  }

  getBookings(cecId : number) {
    return this.http.get(environment.apiUrl + 'Booking/getBookings?cec=' + cecId).pipe(map(this.loaddata))
  }

  getBookingById(bookingId) {
    return this.http.get(environment.apiUrl + 'Booking/getBookingById?bookingId=' + bookingId).pipe(map(this.loaddata))
  }

  getStatusbyId(statusId : number) {
    return this.http.get(environment.apiUrl + 'Booking/getStatus?id=' + statusId).pipe(map(this.loaddata))
  }

  getUserDetails(userId) {
    return this.http.get(environment.apiUrl + 'Logins/getUserDetailsByUsername?userId=' + userId).pipe(map(this.loaddata))
  }

  getDriverBookingDetails(bookingId) {
    return this.http.get(environment.apiUrl + 'Booking/getDriverBookingUserId?bookingId=' + bookingId).pipe(map(this.loaddata))
  }

  getLatestTime(): Observable<any> {
    return this.http.get(environment.apiUrl + 'DriverSchedule/getLatestTime').pipe(map(this.loaddata))
  }

  getLatestDate(): Observable<any> {
    return  this.http.get(environment.apiUrl + 'DriverSchedule/getLatestDate').pipe(map(this.loaddata))
  }

  getLatestBooking(): Observable<any> {
    return this.http.get(environment.apiUrl + 'DriverSchedule/getLatestBooking').pipe(map(this.loaddata))
  }

  getRandomVehicle(): Observable<any>{
    return this.http.get(environment.apiUrl + 'DriverSchedule/getRabdomVehicle').pipe(map(this.loaddata))
  }
  
  getRandomDriver(): Observable<any>{
    return this.http.get(environment.apiUrl + 'DriverSchedule/getRandomDriver').pipe(map(this.loaddata))
  }

  getAllDriverSchedule(): Observable<any>{
    return this.http.get(environment.apiUrl + 'DriverSchedule/getAllSchedule').pipe(map(this.loaddata))
  }

  getScheduleDate(id): Observable<any>{
    return this.http.get(environment.apiUrl + 'DriverSchedule/getScheduleDate?id=' + id).pipe(map(this.loaddata))
  }

  getScheduleTime(id): Observable<any>{
    return this.http.get(environment.apiUrl + 'DriverSchedule/getScheduleTime?id=' + id).pipe(map(this.loaddata))
  }

  getScheduleDetails(): Observable<any>{
    return this.http.get(environment.apiUrl + 'DriverSchedule/getScheduleDetails').pipe(map(this.loaddata))
  }

  getDriverScheduleDetails(id): Observable<any>{
    return this.http.get(environment.apiUrl + 'DriverSchedule/getDriverScheduleDetails?id=' + id).pipe(map(this.loaddata))
  }

  getTrackingByBookingId(bookingId) {
    return this.http.get(environment.apiUrl + 'Tracking/getTrackingByBookingId?bookingId=' + bookingId).pipe(map(this.loaddata))
  }
}
