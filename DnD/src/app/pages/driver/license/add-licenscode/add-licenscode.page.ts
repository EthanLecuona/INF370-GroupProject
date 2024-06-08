import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, ViewWillEnter } from '@ionic/angular';
import { DriverService } from 'src/app/services/driver/driver.service';
import { LoadingService } from 'src/app/services/system/loading.service';

@Component({
  selector: 'app-add-licenscode',
  templateUrl: './add-licenscode.page.html',
  styleUrls: ['./add-licenscode.page.scss'],
})
export class AddLicenscodePage implements OnInit, ViewWillEnter {
  addLicenseCodeForm : FormGroup
  newCode : {}
  licenseCodeList : any[] =[]
  searchTerm : string;
  constructor(private frmBuilder : FormBuilder, private driverRepos : DriverService, private toast : ToastController, private routes : Router, private loadingService : LoadingService) { }

  ngOnInit() {
    this.addLicenseCodeForm = this.frmBuilder.group({
      code : new FormControl('', Validators.required)
    })
  }

  ionViewWillEnter(){
    this.loadData()
  }


  async loadData(){
    this.loadingService.simpleLoader()
    await this.driverRepos.GetAllLicensCode().subscribe(res=>{
      this.licenseCodeList = res
      this.loadingService.dismissLoader()
      console.log(this.licenseCodeList)
    })
  }

  async addLicenseCode(){
    this.newCode = {
      licenseCode : this.addLicenseCodeForm.controls['code'].value
    }

    console.log(this.newCode)
    await this.driverRepos.AddLicensCode(this.newCode).subscribe(res =>{
      console.log(res)
    },(err : HttpErrorResponse) => {
      if(err.status === 200) {
          this.addLicenseCodeForm.reset()
          this.licenseCodeList = []
          this.loadData()
          this.presentToast()
      }
      if(err.status === 400) {
        alert('Please make sure all maintenance info is filled in.')
      }
    })
  }

  async presentToast() {
    const toast = await this.toast.create({
      header: 'License Code',
      message: 'The License Code was added successfully!',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }
}
