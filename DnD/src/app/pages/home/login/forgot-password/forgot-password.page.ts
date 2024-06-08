import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  forgotForm: FormGroup

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.forgotForm = this.fb.group({
      userEmail: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])
    })
  }

  forgotPassword(){
    this.userService.forgotPassword(this.forgotForm.value.userEmail).subscribe(
      (res) => {
        console.log(res)
        localStorage.setItem('forgotpassword', JSON.stringify(res))
        alert("email has been sent to: " + this.forgotForm.value.userEmail)
        this.router.navigateByUrl('home/login/otp')
      },
      (err: HttpErrorResponse) => {
        if(err.status === 200){
          console.log("200")
        }
        if(err.status === 500){
          alert("Please contact support!")
        }
        if(err.status === 404){
          alert("Email does not exist!")
        }
      }
    )
  }
}
