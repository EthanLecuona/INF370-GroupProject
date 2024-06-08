import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  resetPasswordForm : FormGroup
  constructor(private alertController: AlertController, private userService: UserService, private fb : FormBuilder, private router: Router) {

   }

  ngOnInit() {
    this.resetPasswordForm = this.fb.group({
      password1: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      password2: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')])
    })
  }

  resetPassword(){
    if(this.resetPasswordForm.value.password1 == this.resetPasswordForm.value.password2){
      this.userService.resetPassword(this.resetPasswordForm.value.password1).subscribe(
        (res) => {
          console.log(res)
        },
        (err: HttpErrorResponse) => {
          if(err.status === 200){
            if(JSON.parse(localStorage.getItem("user"))){
              alert('Password reset successfully!')
              this.router.navigateByUrl('user/profile')
            }
            else{
              alert('Password reset successfully!')
              this.router.navigateByUrl('home/login')
            }
          }
          if (err.status === 403) {
            alert('Password broke!')
          }
          if(err.status === 500){
            alert('Services are down. Please contact support.')
          }
        })
      
    }
    else{
      alert("Passwords do not match!")
    }
    
  }
  Cancel(){
    this.router.navigateByUrl("user/profile")
  }
  async presentAlert(){
    const confirmReset = await this.alertController.create({
      header: 'Reset Password?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {
            this.resetPassword()
          }
        }
      ]
    })
    await confirmReset.present()
  }

}
