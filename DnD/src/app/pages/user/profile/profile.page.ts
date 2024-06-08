import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from 'selenium-webdriver';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/shared/interfaces/user';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  userProfile


  constructor(private router: Router, public userService: UserService) { }
  

  ngOnInit() {

  }

  
  ResetPassword(){
    this.router.navigateByUrl("user/profile/reset-password")
  }
  Edit(){
    this.router.navigateByUrl("user/profile/edit-profile")
  }
}
