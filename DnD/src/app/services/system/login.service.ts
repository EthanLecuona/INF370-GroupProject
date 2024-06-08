import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from 'src/app/shared/interfaces/login';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';

const headerDict = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Ocp-Apim-Subscription-Key' : '708bb417bed74be887910fba18c06075'
}

const requestOptions = {                                                                                                                                                                                 
  headers: new HttpHeaders(headerDict), 
};

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  public userRole = ''
  
  constructor(private userService: UserService, private httpClient: HttpClient) {}

  private loaddata(res: Response) {
    let body = res;
    return body || {};
  }

  login(userLogin){
    return this.httpClient.post(environment.apiUrl + "Logins/Login/", userLogin, requestOptions)
  }

  logout(){
    var userId = JSON.parse(localStorage.getItem('user'))
    console.log(userId)
    localStorage.removeItem('user')
    localStorage.removeItem('userDetails')
    this.userService.refresh()
    return this.httpClient.get(environment.apiUrl + "Logins/Logout?userId=" + userId.id)
  }

  register(userRegister){
    return this.httpClient.post(environment.apiUrl + "Logins/Register", userRegister)
  }

  getAll(){
    return this.httpClient.get<Login[]>(environment.apiUrl+"Logins/GetAll")
  }

  clientRegister(clientRegister) {
    return this.httpClient.post(environment.apiUrl + 'Logins/RegisterClient', clientRegister)
  }

  getClientID(email) : Observable<any> {
    return this.httpClient.get(environment.apiUrl + "Logins/getClientUserID?email=" + email).pipe(map(this.loaddata))
  }

  getAllTitles(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + 'Titles/GetAllTitles')
  }

  addClientInformation(clientInfo) {
    return this.httpClient.post(environment.apiUrl + 'ClientInformation/addClientInformation', clientInfo)
  }

  addClientEmployeeConnection(CEC) {
    return this.httpClient.post(environment.apiUrl + 'ClientEmployee/addClientEmployee', CEC)
  }

}