import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController, ViewWillEnter } from '@ionic/angular';

import { DriverService } from 'src/app/services/driver/driver.service';

@Component({
  selector: 'app-edit-licenscode',
  templateUrl: './edit-licenscode.page.html',
  styleUrls: ['./edit-licenscode.page.scss'],
})
export class EditLicenscodePage implements OnInit, ViewWillEnter {
  editLicenseCodeForm : FormGroup
  codeList : {}
  updatedCode: {}
  constructor(private driverRepos : DriverService, private frmBuilder : FormBuilder, private route: ActivatedRoute, 
    private toast : ToastController, private routes : Router,  private alertController: AlertController) { }

  ngOnInit() {
    

    this.editLicenseCodeForm = this.frmBuilder.group({
      code : new FormControl('', Validators.required),
      
  })
  }

  ionViewWillEnter(){
    this.onLoadCodes()
  }

  onLoadCodes(){
    this.driverRepos.GetLicenseCode(this.route.snapshot.params['id']).subscribe(res =>{
      this.codeList = (res)
      console.log(this.codeList)
        this.editLicenseCodeForm.setValue({
          code : this.codeList['licenseCode1'],
        })  
    })
  }
  
  async editCodeAlert(){
    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader : 'Edit License Code',
      message : 'Are you sure you want to Edit the License Code',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'CONFIRM',
          role: 'confirm',
          handler: () => {this.editLicenseCode()}
        }
      ]
      
    });
    await alert.present();
  }

  editLicenseCode(){
    this.updatedCode = {
      licenseCode : this.editLicenseCodeForm.controls['code'].value, 
    }
      
      console.log(this.updatedCode)
      this.driverRepos.editLicenseCode(this.codeList['licenseCodeId'], this.updatedCode).subscribe(res =>{
        console.log(res)
        this.routes.navigate(['/driver/license/add-licenscode']).then(() => {
          this.presentToast()
        })
      })
     
  }

  async presentToast() {
    const toast = await this.toast.create({
      header: 'License Code Updated',
      message: 'The License Code was updated successfully!',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }

  async deleteCodeAlert(){
    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader : 'Delete License Code',
      message : 'Are you sure you want to Delete the License Code',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'CONFIRM',
          role: 'confirm',
          handler: () => {this.delLicenseCode()}
        }
      ]
      
    });
    await alert.present();
  }
  async delLicenseCode(){
    this.driverRepos.DeleteLicensCode(this.codeList['licenseCodeId']).subscribe(res =>{
      console.log(res)
      this.routes.navigate(['driver/license/add-licenscode']).then(() => {
        this.deleteToast()
      })
    })
  
  }

  async deleteToast() {
    const toast = await this.toast.create({
      header: 'Vehicle Deactivated',
      message: 'The delivery vehicle was deactivated successfully!',
      position: 'top',
      animated: true,
      color: 'primary',
      duration: 2000,
    });
    toast.present();
  }

}
