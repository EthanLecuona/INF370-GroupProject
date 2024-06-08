import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/interfaces/user';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  details
  public id = ''
  public email = ''
  public Firstname = ''
  public Lastname = ''
  public ProfilePicture = ''
  public PhoneNumber = ''
  public userRole = ''
  user : any
  reset = {
    Password: '',
    Id: ''
  }

  private loaddata(res: Response) {
    let body = res;
    return body || {};
  }
  constructor(private httpClient: HttpClient) { }
  setUser(){
    var userDetails = JSON.parse(localStorage.getItem("userDetails"))
    localStorage.setItem('userDetails', JSON.stringify(userDetails))
    this.Firstname = userDetails['firstname']
    this.Lastname = userDetails['lastname']
    this.ProfilePicture = userDetails['profile_Picture']
    this.PhoneNumber = userDetails['phoneNumber']
    this.email = userDetails['email']
    this.user = JSON.parse(localStorage.getItem('user'))
    this.userRole = this.user['role']
  }

  saveUser(user){
    return this.httpClient.post(environment.apiUrl + "user/EditUser", user)
  }

  getUser(){
    var user = JSON.parse(localStorage.getItem("user"))
    var id = user.id
    return this.httpClient.get<User>(environment.apiUrl + "user/GetUser?Id="+id)
  }

  getUserById(id){
    return this.httpClient.get<User>(environment.apiUrl + "user/getUser?Id="+id)
  }
  refresh(){
    this.Firstname = ''
    this.Lastname = ''
    this.ProfilePicture = ''
    this.userRole = ''
    this.email = ''
    this.PhoneNumber = ''
    this.id = ''
  }
  resetPassword(password){
    if(JSON.parse(localStorage.getItem("user"))){
      this.user = JSON.parse(localStorage.getItem("user"))
      this.id = this.user.id;
      this.reset.Password = password
      this.reset.Id = this.id
      return this.httpClient.post(environment.apiUrl + "user/resetpassword", this.reset)
    }
    else{
      this.user = JSON.parse(localStorage.getItem("forgotpassword"))
      localStorage.setItem("forgotpassword", "")
      this.id = this.user.id
      this.reset.Password = password
      this.reset.Id = this.id
      return this.httpClient.post(environment.apiUrl + "user/resetpassword", this.reset)
    }
    
  }

  forgotPassword(email){
    this.email = email
    var forgotObject = {
      userEmail: email
    }

    return this.httpClient.post(environment.apiUrl + "user/ForgotPassword", forgotObject)
  }

  verifyOTP(otp){
    console.log(otp)
    var otpObject = { 
      userEmail: this.email,
      otp: otp
    }
    return this.httpClient.post(environment.apiUrl + "user/VerifyOTP", otpObject)
  }

  addUserToRole(id, role){
   return this.httpClient.post(environment.apiUrl + "Role/AddUserToRole?roleName=" + id, role)
 
  }

  addRole(newRole){
    return this.httpClient.post(environment.apiUrl + "Role/AddRole" , newRole)
  
  }

  getRolebyID(id) : Observable<any>{
    return this.httpClient.get(environment.apiUrl + "Role/GetRoleById?Id=" + id).pipe(map(this.loaddata))
  }

  getRoles(): Observable<any>{
    return this.httpClient.get(environment.apiUrl + "Role/GetAllRoles").pipe(map(this.loaddata))
    
  }

  getAllRoles(): Observable<any>{
    return this.httpClient.get(environment.apiUrl + "Role/GetRoles").pipe(map(this.loaddata))
  }

  getAllEmployees(): Observable<any>{
    return this.httpClient.get(environment.apiUrl + "Role/getAllEmployees").pipe(map(this.loaddata))
  }

  getUserInformation(id){
    return this.httpClient.get(environment.apiUrl + "User/GetUser?Id=" + id).pipe(map(this.loaddata))
  }
  
  editRole(id, role){
   return this.httpClient.put(environment.apiUrl + "Role/updateRole?id=" + id, role)
  
  }

  getUsers(): Observable<any>{
    return this.httpClient.get(environment.apiUrl + "User/getAllUsers").pipe(map(this.loaddata))
  }

  deactivateUser(id, user){
   return this.httpClient.put(environment.apiUrl + "User/deactivateUser?id=" + id, user)

  }

  deleteRole(id): any{
    return this.httpClient.delete(environment.apiUrl + "Role/deleteRole?id=" + id)

  }

  getDateByID(): Observable<any>{
    return  this.httpClient.get(environment.apiUrl + "User/getDateByID").pipe(map(this.loaddata))
  }
}
