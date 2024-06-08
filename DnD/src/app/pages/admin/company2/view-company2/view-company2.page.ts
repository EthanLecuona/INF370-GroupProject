import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { CompanyServiceService } from 'src/app/services/admin/company/company.service';
import { LoadingService } from 'src/app/services/system/loading.service';

@Component({
  selector: 'app-view-company2',
  templateUrl: './view-company2.page.html',
  styleUrls: ['./view-company2.page.scss'],
})
export class ViewCompany2Page implements OnInit {
  viewCompanyForm: FormGroup;
  companyList: {}
  addressList: {}
  streetList: {}
  suburbList: {}
  cityList : {}
  canDeactivate1 : boolean
  canDeactivate2 : boolean

  constructor(
    private companyRepos: CompanyServiceService,
    private frmBuilder: FormBuilder,
    private route: ActivatedRoute,
    private alertController : AlertController,
    private toast : ToastController,
    private routes : Router,
    private loader : LoadingService
  ) {}

  ngOnInit() {
    this.loader.simpleLoader()
    this.onLoadCompany();

    this.viewCompanyForm = this.frmBuilder.group({
      companyName: new FormControl('', Validators.required),
      streetNumber: new FormControl('', Validators.required),
      Suburb: new FormControl('', Validators.required),
      streetName: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
    });
  }

  onLoadCompany() {
    this.companyRepos.getCompany(this.route.snapshot.params['id']).subscribe((res) => {
      this.companyList = res;
      console.log(this.companyList)
      this.companyRepos.getAddress(this.companyList['addressId']).subscribe((res)=> {
        this.addressList = res;
        console.log(this.addressList)
        this.companyRepos.getStreet(this.addressList['streetId']).subscribe((res) => {
          this.streetList = res
          console.log(this.streetList)
          this.companyRepos.getSuburb(this.streetList['suburbId']).subscribe((res) => {
            this.suburbList = res
            console.log(this.suburbList)
            this.companyRepos.getCity(this.suburbList['cityId']).subscribe((res) => {
              this.cityList = res
              this.viewCompanyForm.setValue({
                companyName: this.companyList['companyName'],
                streetNumber: this.streetList['streetNumber'],
                Suburb: this.suburbList['suburb1'],
                streetName: this.streetList['streetName'],
                postalCode: this.addressList['postalCode'],
                city: this.cityList['cityName']
              })
              this.loader.dismissLoader()
            })
          })
        })
      })
    });
  }

  async presentDeactivateCompanyAlert(){
    const confirmReset = await this.alertController.create({
      header: 'Confirm Deactivation',
      message: 'Are you sure you want to deactivate the selected company?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {this.deactivateCompany()}
        }
      ]
    })
    await confirmReset.present()
  }

  deactivateCompany() {
    this.companyRepos.checkDeactivateClient(this.route.snapshot.params['id']).subscribe((res : boolean) => {
      this.canDeactivate1 = res
      this.companyRepos.checkDeactivateOther(this.route.snapshot.params['id']).subscribe((res : boolean) => {
        this.canDeactivate2 = res
        console.log(this.canDeactivate1)
        console.log(this.canDeactivate2)
        if((this.canDeactivate1 == false) && (this.canDeactivate2 == false))
        {
          this.companyRepos.deactivateCompany(this.route.snapshot.params['id']).subscribe(res => {
            console.log(res)
            this.routes.navigateByUrl('/admin/company').then(() => {
              this.companyDeactivateSuccess()
            })
          }, (err : HttpErrorResponse) => {
            if (err.status === 404) {
              this.companyDeactivateError()
            } else if (err.status === 500) {
              this.companyDeactivateError()
            } else if (err.status === 400) {
              this.companyDeactivateError()
            }
          })
        } else {
          this.DeactivateFailAlert()
        }
      })
    })

  }

  async companyDeactivateSuccess() {
    const toast = await this.toast.create({
      message: 'Company successfully deactivated',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 3000,
    });
    toast.present();
  }

  async companyDeactivateError() {
    const toast = await this.toast.create({
      message: 'Company deactivation unsuccessful',
      position: 'top',
      animated: true,
      color: 'danger',
      duration: 3000,
    });
    toast.present();
  }

  async DeactivateFailAlert(){
    const confirmReset = await this.alertController.create({
      header : 'Deactivation Failed',
      message: 'The selected company still has active bookings or projects and cannot be deactivated!',
      buttons: [
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {}
        }
      ]
    })
    await confirmReset.present()
  }
}
