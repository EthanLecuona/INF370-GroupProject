import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';

import { LoadingService } from 'src/app/services/system/loading.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit , ViewWillEnter{

  users : any[] =[]
  searchTerm : string
  constructor(private fb: FormBuilder, private router: Router, public userService: UserService, private loadingService: LoadingService) { }

  ngOnInit() {

    
  }

  ionViewWillEnter(){
    this.loadingService.simpleLoader()
    this.userService.getUsers().subscribe(res =>{
      this.users = res
      this.loadingService.dismissLoader()
      console.log(this.users)
    })
  }

}
