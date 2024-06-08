import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController, NavController, Platform, ToastController } from '@ionic/angular';
import OneSignal from 'onesignal-cordova-plugin';
import { OneSignal as oneSignal } from '@ionic-native/onesignal/ngx';


import { LoginService } from 'src/app/services/system/login.service';
import { UserService } from 'src/app/services/user/user.service';
import { LoadingService } from 'src/app/services/system/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private userService: UserService, 
    private router: Router, 
    public navCtrl: NavController, 
    private loginService: LoginService, 
    private alertCtrl: AlertController, 
    private menu: MenuController, 
    private fb: FormBuilder,
    private platform: Platform,
    private oneSignal: oneSignal,
    private loader : LoadingService,
    private toast : ToastController
    ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userEmail: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      userPassword: new FormControl('', Validators.required)
    })
    
  }

  Login(){
    this.loader.simpleLoader()
    this.loginService.login(this.loginForm.value).subscribe(
      (res) => {
        localStorage.setItem('user', JSON.stringify(res))
        this.GetUserRole()
        this.userService.getUser().subscribe(
          (res) => {
            localStorage.setItem('userDetails', JSON.stringify(res))
            console.log(JSON.parse(localStorage.getItem('userDetails')))
            console.log(JSON.parse(localStorage.getItem('user')))
            this.GetUserDetails()
            console.log(this.userService.userRole)
            if(this.platform.is('desktop')) {
              this.loader.dismissLoader()
            } else {
              this.initializeApp()
            }
            this.loader.dismissLoader()
          },
          (err: HttpErrorResponse) => {
            if(err.status === 500){
              alert("Please contact support!")
            }
          }
        )
        if(this.userService.userRole == "employee"){
          this.router.navigateByUrl("employee").then(() => {
            this.LoginSuccess()
          })
        }
        if(this.userService.userRole == "driver"){
          this.router.navigateByUrl("driver").then(() => {
            this.LoginSuccess()
          })
        }
        if(this.userService.userRole == "client"){
          this.router.navigateByUrl("client").then(() => {
            this.LoginSuccess()
          })
        }
        if(this.userService.userRole == "admin" || this.userService.userRole == "superadmin"){
          this.router.navigateByUrl("admin").then(() => {
            this.LoginSuccess()
          })
        }
        if(this.userService.userRole == "manager"){
          this.router.navigateByUrl("management").then(() => {
            this.LoginSuccess()
          })
        }
        this.loader.dismissLoader()
    },
    (err: HttpErrorResponse) =>{
      if(err.status === 500){
        this.serverError()
        this.loader.dismissLoader()
      }
      if(err.status === 403){
        this.forbidden()
        this.loader.dismissLoader()
      }
      if(err.status === 404){
        this.accountNotFound()
        this.loader.dismissLoader()
      }
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.setupPush();
    });
  }

  setupPush() {
    var externalUserId : string
    var localId = JSON.parse(localStorage.getItem('user'))
    if(JSON.parse(localStorage.getItem('user')) != null) {
      externalUserId = localId['id']
    } else {
      this.userService.setUser()
    }
    // I recommend to put these into your environment.ts
    this.oneSignal.startInit('ed9fec6a-23fd-4076-941b-8afdcdcd3312', '109908786013');
    OneSignal.setAppId('ed9fec6a-23fd-4076-941b-8afdcdcd3312')
    OneSignal.setExternalUserId(externalUserId)
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
 
    this.oneSignal.handleNotificationReceived().subscribe(data => {
      let msg = data.payload.body;
      let title = data.payload.title;
      let additionalData = data.payload.additionalData;
      this.showAlert(title, msg, additionalData.task);
    });
 
    this.oneSignal.handleNotificationOpened().subscribe(data => {
      let additionalData = data.notification.payload.additionalData;
 
      this.showAlert('Notification opened', 'You already read this before', additionalData.task);
    });
 
    this.oneSignal.endInit();
  }

  async showAlert(title, msg, task) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: `Action: ${task}`,
          handler: () => {
            // Navigate to a specific screen
          }
        }
      ]
    })
    alert.present();
  }

  signUp(){
    this.router.navigateByUrl("home/register")
  }

  ForgotPassword(){
    this.router.navigateByUrl('home/login/forgot-password')
  }

  GetUserRole(){
    var user = JSON.parse(localStorage.getItem("user"))
    this.userService.userRole = user.role
  }

  GetUserDetails(){
    var user = JSON.parse(localStorage.getItem("userDetails"))
    this.userService.Firstname = user.firstname
    this.userService.Lastname = user.lastname
    this.userService.ProfilePicture = user.profile_Picture
  }

  async LoginSuccess() {
    const toast = await this.toast.create({
      header: 'Welcome' + this.userService.Firstname + ' ' + this.userService.Lastname,
      position: 'top',
      animated: true,
      color: 'success',
      duration: 3000,
    });
    toast.present();
  }

  async accountNotFound() {
    const toast = await this.toast.create({
      header: 'Email or Password Incorrect',
      position: 'top',
      animated: true,
      color: 'danger',
      duration: 3000,
    });
    toast.present();
  }

  async serverError() {
    const toast = await this.toast.create({
      header: 'Server is offline, please try again later',
      position: 'top',
      animated: true,
      color: 'danger',
      duration: 3000,
    });
    toast.present();
  }

  async forbidden() {
    const toast = await this.toast.create({
      header: 'Access to account forbidden!',
      position: 'top',
      animated: true,
      color: 'danger',
      duration: 3000,
    });
    toast.present();
  }

}
