import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { LoginService } from 'src/app/services/system/login.service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  constructor(
    private appComponent: AppComponent, 
    private routes : Router
    ) {}

    dashboardItem = this.appComponent.adminPages
    sources = [
      'https://i.ibb.co/tbsdqKp/view-and-search.png',
      'https://i.ibb.co/z8FgDSH/busy-project-manager-overwhelmed-by-work.png',
      'https://i.ibb.co/QQFHZvS/two-people-collaborating-online.png',
      'https://i.ibb.co/6tswL6q/woman-standing-pointing.png',
      'https://i.ibb.co/166tW1c/browser-displaying-bar-chart.png',
      'https://i.ibb.co/PQyFkBv/person-sending-email-parcel.png',
      'https://i.ibb.co/Z8J1SLd/person-studying-online.png',
      'https://i.ibb.co/wsQthf5/person-changing-settings2.png',
      'https://i.ibb.co/6tswL6q/woman-standing-pointing.png',
      'https://i.ibb.co/17YT3d4/people-and-technology.png',
      'https://i.ibb.co/jGz9Yct/people-preparing-for-delivery.png',
      'https://i.ibb.co/d4vjHpP/person-pie-chart.png',
      'https://i.ibb.co/pyV9Qqw/person-changing-settings.png',
      'https://i.ibb.co/ZKHtkqt/person-presenting-pie-chart.png',
      'https://i.ibb.co/MkBSFCY/Settings.png'
    ]

  ngOnInit() {
  }

  navigate(i) {
    console.log(i)
    this.routes.navigateByUrl(this.dashboardItem[i].url)
  }
}
