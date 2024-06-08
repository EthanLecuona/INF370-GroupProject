import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],
})
export class EmployeePage implements OnInit {
  constructor(
    private appComponent: AppComponent, 
    private routes : Router
    ) {}

    dashboardItem = this.appComponent.employeePages
    sources = [
      'https://i.ibb.co/tbsdqKp/view-and-search.png',
      'https://i.ibb.co/z8FgDSH/busy-project-manager-overwhelmed-by-work.png',
      'https://i.ibb.co/BjPT4nW/two-people-collaborating-online.png',
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
