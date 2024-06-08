import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { CompanyServiceService } from 'src/app/services/admin/company/company.service';

@Component({
  selector: 'app-edit-company2',
  templateUrl: './edit-company2.page.html',
  styleUrls: ['./edit-company2.page.scss'],
})
export class EditCompany2Page implements OnInit {
  editCompanyForm: FormGroup;
  companyList: {}
  addressList: {}
  streetList: {}
  suburbList: {}
  cityList : {}

  updatedCompany: {}
  updatedAddress: {}
  updatedStreet: {}
  updatedSuburb: {}
  updatedCity: {}

  constructor(
    private companyRepos: CompanyServiceService,
    private frmBuilder: FormBuilder,
    private route: ActivatedRoute,
    private toast: ToastController,
    private routes: Router,
    private alertController : AlertController
  ) {}

  ngOnInit() {
    this.onLoadCompany()

    this.editCompanyForm = this.frmBuilder.group({
      companyName : new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      streetName : new FormControl('', [Validators.required, Validators.minLength(4) , Validators.pattern('^[a-zA-Z _]*$')]),
      streetNumber : new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(8) , Validators.pattern('[1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]')]),
      suburb : new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern('^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$')]),
      postalCode : new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('[1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]')]),
      city : new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z\s]*$')]),
    });
  }

  async presentUpdateCompanyAlert(){
    const confirmReset = await this.alertController.create({
      header: 'Confirm Company Update',
      message: 'Are you sure that all the new company details are correct?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {this.editCompany()}
        }
      ]
    })
    await confirmReset.present()
  }

  async presentToast() {
    const toast = await this.toast.create({
      header: 'Company Updated',
      message: 'Company profile successfully updated.',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
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
              this.editCompanyForm.setValue({
                companyName: this.companyList['companyName'],
                streetNumber: this.streetList['streetNumber'],
                suburb: this.suburbList['suburb1'],
                streetName: this.streetList['streetName'],
                postalCode: this.addressList['postalCode'],
                city: this.cityList['cityName']
              })
            })
          })
        })
      })
    })
  }

  editCompany() {
    this.updatedCompany = {
      companyName: this.editCompanyForm.controls['companyName'].value,
      addressId: this.addressList['addressId']
    }
    this.updatedAddress = {
      streetId: this.streetList['streetId'],
      postalCode: this.editCompanyForm.controls['postalCode'].value
    }
    this.updatedStreet = {
      streetName: this.editCompanyForm.controls['streetName'].value,
      suburbId: this.suburbList['suburbId'],
      streetNumber: this.editCompanyForm.controls['streetNumber'].value
    }
    this.updatedSuburb = {
      cityId: this.cityList['cityId'],
      suburb1: this.editCompanyForm.controls['suburb'].value
    }
    this.updatedCity = {
      cityName: this.editCompanyForm.controls['city'].value
    }

    this.companyRepos.editCity(this.cityList['cityId'],this.updatedCity).subscribe(res =>{
      this.routes.navigate(['admin/company']).then(() => {
        this.presentToast()
      })
    })
    this.companyRepos.editSuburb(this.suburbList['suburbId'],this.updatedSuburb).subscribe(res =>{
      this.routes.navigate(['admin/company']).then(() => {
        this.presentToast()
      })
    })
    this.companyRepos.editStreet(this.streetList['streetId'],this.updatedStreet).subscribe(res =>{
      this.routes.navigate(['admin/company']).then(() => {
        this.presentToast()
      })
    })
    this.companyRepos.editAddress(this.addressList['addressId'],this.updatedAddress).subscribe(res =>{
      this.routes.navigate(['admin/company']).then(() => {
        this.presentToast()
      })
    })
    this.companyRepos.editCompany(this.companyList['companyId'],this.updatedCompany).subscribe(res =>{
      this.routes.navigate(['admin/company']).then(() => {
        this.presentToast()
      })
    }, (err : HttpErrorResponse) => {
      if (err.status === 400)
      {
        alert('Problem updating company')
      }else if (err.status === 403)
      {
        alert('Company with that name already exists')
      }
    })


    
  }

}


