import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyServiceService {

  newCompany: {};

  constructor(private http: HttpClient) {}

  private loaddata(res: Response) {
    let body = res;
    return body || {};
  }

  //Api post method

  addCompany(companyForm) {

    this.newCompany = {
      cityName : companyForm['city'],
      suburb1 : companyForm['suburb'],
      streetName : companyForm['streetName'],
      streetNumber : Number(companyForm['streetNumber']),
      postalCode : Number(companyForm['postalCode']),
      companyName : companyForm['companyName']
    }
    console.log(this.newCompany)
    return this.http.post(environment.apiUrl + 'Companies/addCompany', this.newCompany)
  }

  //Api get methods

  getCompany(id) {
    return this.http.get(environment.apiUrl + 'Companies/getCompany?id=' + id).pipe(map(this.loaddata))
  }
  
  getAddress(id) {
    return this.http.get(environment.apiUrl + 'Addresses/getAddressById?id=' + id).pipe(map(this.loaddata))
  }

  getStreet(id) {
    return this.http.get(environment.apiUrl + 'Streets/getStreetById?id=' + id).pipe(map(this.loaddata))
  }

  getSuburb(id) {
    return this.http.get(environment.apiUrl + 'Suburbs/getSuburbById?id=' + id).pipe(map(this.loaddata))
  }

  getCity(id) {
    return this.http.get(environment.apiUrl + 'Cities/getCityById?id=' + id).pipe(map(this.loaddata))
  }

  getAllCompanies(): Observable<any> {
    return this.http.get(environment.apiUrl + 'Companies/GetAllCompanies').pipe(map(this.loaddata))
  }
  getAllActiveCompanies(): Observable<any> {
    return this.http.get(environment.apiUrl + 'Companies/GetAllActiveCompanies').pipe(map(this.loaddata))
  }

  //Api Put methods
  
  editCompany(id, updatedCompany) {
   return this.http.put(environment.apiUrl + 'Companies/updateCompany?id=' + id, updatedCompany)
  }

  editAddress(id, updatedAddress) {
    return this.http.put(environment.apiUrl + 'Addresses/updateAddress?id=' + id, updatedAddress)
  }

  editStreet(id, updatedStreet) {
   return this.http.put(environment.apiUrl + 'Streets/updateStreet?id=' + id, updatedStreet)
  }

  editSuburb(id, updatedSuburb) {
   return this.http.put(environment.apiUrl + 'Suburbs/updateSuburb?id=' + id, updatedSuburb)
  }

  editCity(id, updatedCity) {
   return this.http.put(environment.apiUrl + 'Cities/updateCity?id=' + id, updatedCity)
  }

  deactivateCompany(id) {
    return this.http.put(environment.apiUrl + 'Companies/deactivateCompany?id=' + id, id)
  }

  checkDeactivateClient(id) {
    return this.http.get(environment.apiUrl + 'Companies/checkDeactivateClient?companyID=' + id)
  }

  checkDeactivateOther(id) {
    return this.http.get(environment.apiUrl + 'Companies/checkDeactivateOther?companyID=' + id)
  }

}
