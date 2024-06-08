import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-management',
  templateUrl: './management.page.html',
  styleUrls: ['./management.page.scss'],
})
export class ManagementPage implements OnInit {

  constructor(
    private appComponent: AppComponent, 
    private routes : Router
    ) {}

    dashboardItem = this.appComponent.managerPages
    sources = [
      'https://i.ibb.co/tbsdqKp/view-and-search.png',
      'https://i.ibb.co/z8FgDSH/busy-project-manager-overwhelmed-by-work.png',
      'https://i.ibb.co/17YT3d4/people-and-technology.png',
      'https://i.ibb.co/jGz9Yct/people-preparing-for-delivery.png',
      'https://i.ibb.co/d4vjHpP/person-pie-chart.png',
      'https://i.ibb.co/pyV9Qqw/person-changing-settings.png',
      'https://i.ibb.co/MkBSFCY/Settings.png'
    ]

  ngOnInit() {
  }

  navigate(i) {
    console.log(i)
    this.routes.navigateByUrl(this.dashboardItem[i].url)
  }
}
