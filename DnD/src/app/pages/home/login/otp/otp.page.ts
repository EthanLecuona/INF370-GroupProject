import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  otpForm: FormGroup
  
  constructor(private router: Router, private userService: UserService, private fb: FormBuilder) { }

  ngOnInit() {
    this.otpForm = this.fb.group({
      otp: new FormControl('', [Validators.required, Validators.maxLength(4), Validators.minLength(4)])
    })
  }

  verifyOTP(){
    if(this.otpForm.valid){
      this.userService.verifyOTP(this.otpForm.value.otp).subscribe(
        () => {
          
        },
        (err: HttpErrorResponse) => {
          if(err.status === 200){
            alert('OTP Verified successfully!')
            this.router.navigateByUrl('user/profile/reset-password')
          }
          if (err.status === 404) {
            alert('OTP incorrect.')
          }
          if(err.status === 500){
            alert('Your OTP is no longer valid, provide email again.')
          }
        })
    }
    else{
      alert('Please enter OTP pin sent to your email!')
    }
 
  }
}
