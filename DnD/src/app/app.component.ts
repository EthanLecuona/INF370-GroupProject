import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/system/login.service';
import { UserService } from './services/user/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertController, MenuController, Platform, ToastController } from '@ionic/angular';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core'
import { Keepalive } from '@ng-idle/keepalive';
import { AdminService } from './services/admin/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit{

  isDesktop : boolean
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;

  constructor(
    private router: Router,
    public userService: UserService,
    public adminService: AdminService,
    public loginService: LoginService,
    public menuCtrl: MenuController,
    private platform: Platform,
    private alertController: AlertController,
    private toast : ToastController,
    public idle: Idle,
    private keepalive: Keepalive
    ) {


  }

  reset(){
    this.idle.watch()
    this.idleState = 'Started.'
    this.timedOut = false
  }

  ngOnInit(){
    // this.toggleMenu(this.platform.width())

    if(this.userService.userRole['role'] != '')
    {
      this.userService.setUser()
      this.idle.setIdle(15)
      this.adminService.GetLogoutTimer().subscribe(
        (res) => {
          console.log(res)
          this.idle.setTimeout(res['logoutTimer'])
        }
      )
      // this.idle.setTimeout(60)
      this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES)
      this.idle.onIdleEnd.subscribe(() => {
        this.idleState = 'No longer idle.'
        console.log(this.idleState)
      })
      this.idle.onTimeout.subscribe(() => {
        this.idleState = 'Timed out!'
        console.log(this.idleState)
        this.logout()
        this.timedOut = true
      })
      this.idle.onIdleStart.subscribe(() => {
        this.idleState = 'idle state'
        console.log(this.idleState)
      })
      this.idle.onTimeoutWarning.subscribe((countdown) => {
        this.idleState = 'You will time out in ' + countdown + ' seconds.'
        console.log(this.idleState)
      })
      this.reset()
    }
    if(this.platform.is('desktop')) {
      this.isDesktop = true
      console.log(this.isDesktop)
    } else {
      this.isDesktop = false
      console.log(this.isDesktop)
    }
  }
  // toggleMenu(width){
  //   if(width > 768){
  //     this.menuCtrl.enable(false, 'main')
  //   } else {
  //     this.menuCtrl.enable(true, 'main')
  //   }
  // }
  async presentAlert(){
    const confirmReset = await this.alertController.create({
      header: 'Confirm Logout',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {
            this.logout()
          }
        }
      ]
    })
    await confirmReset.present()
  }

  logout(){
    this.loginService.logout().subscribe(
      (res) => {
        console.log(res)
      },
      (err: HttpErrorResponse) => {
        if(err.status === 200){
          this.userService.refresh()
          this.router.navigateByUrl("home/login").then(() => {
            this.LogoutSuccess().then(() => {
              location.reload()
            })
          })
        }
      })
    }

    async LogoutSuccess() {
      const toast = await this.toast.create({
        message: 'Successfully Logged Out',
        position: 'top',
        animated: true,
        color: 'success',
        duration: 3000,
      });
      toast.present();
    }

  public loggedOutPages = [
    {
      title: 'Home',
      url: 'home',
      icon: 'home',
    },
    {
      title: 'About',
      url: 'home/about',
      icon: 'search',
    },
    {
      title: 'Login',
      url: 'home/login',
      icon: 'log-in',
    },
    {
      title: 'Register',
      url: 'home/register',
      icon: 'finger-print',
    },
    {
      title: 'Contact',
      url: 'home/contact',
      icon: 'mail',
    },
    {
      title: 'Covid-19 Resources',
      url: 'home/covid19',
      icon: 'information',
    },
    {
      title : 'Help Document',
      url : 'home/help',
      icon : 'help-outline'
    }
  ]
  public managerPages = [
    {
      title: 'Manager Dashboard',
      url: 'management',
      icon: 'home-outline'
    },
    {
      title: 'Add Bookings',
      url: 'booking',
      icon: 'create'
    },
    {
      title: 'View Bookings',
      url: 'bookingview',
      icon: 'calendar-number'
    },
    {
      title: 'Projects',
      url: 'admin/project',
      icon: 'documents'
    },
    {
      title: 'Events',
      url: 'management/event',
      icon: 'bonfire'
    },
    {
      title: 'Reports',
      url: 'report',
      icon: 'clipboard'
    },
    {
      title: 'Profile',
      url: 'user/profile',
      icon: 'id-card'
    }
  ]

  public adminPages = [
    {
      title: 'Admin Dashboard',
      url: 'admin',
      icon: 'home-outline'
    },
    {
      title: 'Add Bookings',
      url: 'booking',
      icon: 'create'
    },
    {
      title: 'View Bookings',
      url: 'bookingview',
      icon: 'calendar-number'
    },
    {
      title: 'Users',
      url: 'admin/user',
      icon: 'people'
    },
    {
      title: 'Vehicles',
      url: 'admin/vehicle',
      icon: 'car'
    },
    {
      title: 'Fuel Prices',
      url: 'driver/fuel-price',
      icon: 'cash-outline'
    },
    {
      title: 'Drivers',
      url: 'driver',
      icon: 'speedometer-outline'
    },
    {
      title: 'Schedule',
      url: 'driver/schedule',
      icon: 'speedometer-outline'
    },
    {
      title: 'Company',
      url: 'admin/company',
      icon: 'business'
    },
    {
      title: 'Project',
      url: 'admin/project',
      icon: 'documents'
    },
    {
      title: 'Maintainence',
      url: 'admin/vehicle/maintenance',
      icon: 'hammer'
    },
    {
      title: 'Events',
      url: 'management/event',
      icon: 'bonfire'
    },
    {
      title: 'Reports',
      url: 'report',
      icon: 'clipboard'
    },
    {
      title: 'Profile',
      url: 'user/profile',
      icon: 'id-card'
    },
    {
      title: 'App Settings',
      url: 'admin/app-settings',
      icon: 'settings-outline'
    }
  ]

  public employeePages = [
    {
      title: 'Employee Dashboard',
      url: 'employee',
      icon: 'home-outline'
    },
    {
      title: 'Add Bookings',
      url: 'booking',
      icon: 'create'
    },
    {
      title: 'View Bookings',
      url: 'bookingview',
      icon: 'calendar-number'
    },
    {
      title: 'Register Client',
      url: 'user/client-registration-form',
      icon: 'person-add'
    },
    {
      title: 'Profile',
      url: 'user/profile',
      icon: 'id-card'
    },
  ]

  public clientPages = [
    {
      title: 'Client Dashboard',
      url: 'client',
      icon: 'home-outline'
    },
    {
      title: 'Add Bookings',
      url: 'booking',
      icon: 'create'
    },
    {
      title: 'View Bookings',
      url: 'bookingview',
      icon: 'calendar-number'
    },
    {
      title: 'Profile',
      url: 'user/profile',
      icon: 'id-card'
    },
  ]

  public driverPages = [
    {
      title: 'Driver',
      url: 'driver',
      icon: 'home-outline'
    },
    {
      title: 'Deliveries',
      url: 'driver/schedule',
      icon: 'brush'
    },
    {
      title: 'Profile',
      url: 'user/profile',
      icon: 'id-card'
    },
    {
      title: 'Incident',
      url: 'driver/incident',
      icon: 'bonfire'
    },
    {
      title: 'Post Inspection',
      url: 'driver/post-inspection',
      icon: 'id-card'
    },
    {
      title: 'Refuelled',
      url: 'driver/fuel-price',
      icon: 'car-sport-outline'
    }
  ]
}

