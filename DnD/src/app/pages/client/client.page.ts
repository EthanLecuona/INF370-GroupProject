import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {
  constructor(
    private appComponent: AppComponent, 
    private routes : Router
    ) {}

    dashboardItem = this.appComponent.clientPages
    sources = [
      'https://i.ibb.co/tbsdqKp/view-and-search.png',
      'https://i.ibb.co/z8FgDSH/busy-project-manager-overwhelmed-by-work.png',
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
