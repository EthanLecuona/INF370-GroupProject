import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DriverService } from 'src/app/services/driver/driver.service';
import { LoginService } from 'src/app/services/system/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private driverService : DriverService) { }
  
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
    this.driverService.driverRegister(this.registerForm.value).subscribe(
      (res) => {
        console.log(res)
        alert("Driver account created successfully!")
        this.router.navigateByUrl('driver/license')
      },
      (err: HttpErrorResponse) => {
        if(err.status === 200){
         
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
