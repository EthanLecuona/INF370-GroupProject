import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { LoginService } from 'src/app/services/system/login.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/system/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  
  constructor(private loginService: LoginService,private menu: MenuController, private router: Router, private notification : NotificationService) { 

  }

  ngOnInit() {
   
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  login(){
    this.router.navigateByUrl('home/login')
  }

  covid(){
    this.router.navigateByUrl('home/covid19')
  }

  help(){
    this.router.navigateByUrl('home/help')
  }

  contact(){
    this.router.navigateByUrl('home/contact')
  }

  about(){
    this.router.navigateByUrl('home/about')
  }
}
