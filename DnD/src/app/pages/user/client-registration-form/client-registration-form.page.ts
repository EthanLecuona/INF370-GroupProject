import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CompanyServiceService } from 'src/app/services/admin/company/company.service';
import { MaintenanceService } from 'src/app/services/admin/maintenance/maintenance.service';

@Component({
  selector: 'app-client-registration-form',
  templateUrl: './client-registration-form.page.html',
  styleUrls: ['./client-registration-form.page.scss'],
})
export class ClientRegistrationFormPage implements OnInit {

  email : {}
  registerClient : FormGroup
  companies : any[] = []
  activeCompanies : any[] = []
  userId : {}

  constructor(
    private frmBuilder : FormBuilder, 
    private maintenanceRepos : MaintenanceService, 
    private companyRepos : CompanyServiceService,
    private toast : ToastController,
    private router: Router,
    ) { }

  ngOnInit() {
    this.registerClient = this.frmBuilder.group({
      email : new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      company : new FormControl('', Validators.required)
    })

    this.loadData()
  }

  loadData() {
    this.companyRepos.getAllCompanies().subscribe(res => {
      this.companies = res
      for(var i = 0 ; i < this.companies.length; i++) {
        if(this.companies[i]['activated'] == true) {
          this.activeCompanies.push(this.companies[i])
        }
      }
    })
  }

  addClient() {
    var index = this.registerClient.controls['company'].value[2]
    this.userId = JSON.parse(localStorage.getItem('user'))
    this.email = {
      ToEmail: this.registerClient.controls['email'].value,
      Subject: 'DnD Registration',
      Body: 'Please follow the following link to register as a client on the Drive n Deliver system. To Register: http://localhost:8100/client/client-registration/' 
      + this.userId['id'] + '/' + this.registerClient.controls['email'].value + '/' + index
    }
    this.maintenanceRepos.sendEmail(this.email).subscribe(res => {
      console.log(res)
      this.presentToastSuccess().then(() => {
        this.router.navigateByUrl("employee")
      }, (err : HttpErrorResponse) => {
        if(err.status === 400) {
          this.presentToastFail()
        } else if (err.status === 500) {
          this.presentToastFail()
        } else if (err.status === 404) {
          this.presentToastFail()
        }
      })
    })
  }

  async presentToastSuccess() {
    const toast = await this.toast.create({
      header: 'Email Sent',
      message: 'An Email was successfully sent to the client!',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }

  async presentToastFail() {
    const toast = await this.toast.create({
      header: 'Email not sent',
      message: 'An Email could not be sent at this time!',
      position: 'top',
      animated: true,
      color: 'danger',
      duration: 2000,
    });
    toast.present();
  }


}
