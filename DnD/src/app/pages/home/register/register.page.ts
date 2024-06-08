import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/services/system/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      Firstname: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      Lastname: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      UserEmail: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      PhoneNumber: new FormControl('', [Validators.required, Validators.pattern('0[0-9]{9}')]),
      UserPassword: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')])
    })
  }

  Register(){
    console.log("Register.")
    this.loginService.register(this.registerForm.value).subscribe(
      (res) => {
        console.log(res)
      },
      (err: HttpErrorResponse) => {
        if(err.status === 200){
          alert("Account created successfully!")
          this.router.navigateByUrl('home/login')
        }
        if(err.status === 403){
          alert("already exists")
        }
        if(err.status === 500){
          alert("Contact support!")
        }
      }
    )
  }
}
