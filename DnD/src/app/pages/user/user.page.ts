import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  users : any[] =[]
  searchTerm : string
  constructor(private fb: FormBuilder, private router: Router, public userService: UserService) { }

  ngOnInit() {


    this.userService.getUsers().subscribe(res =>{
      this.users = res
      console.log(this.users)
    })
  }

}
