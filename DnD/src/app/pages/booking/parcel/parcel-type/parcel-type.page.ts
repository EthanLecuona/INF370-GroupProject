import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { BookinginfoService } from 'src/app/services/system/bookinginfo.service';

@Component({
  selector: 'app-parcel-type',
  templateUrl: './parcel-type.page.html',
  styleUrls: ['./parcel-type.page.scss'],
})
export class ParcelTypePage implements OnInit {

  addTypeForm : FormGroup
  typeList : any[] = []

  constructor(private bookingInfoService : BookinginfoService, private frmBuilder : FormBuilder, private toast : ToastController, private routes: Router, private alertController: AlertController) { }

  ngOnInit() {
   
    this.loadData()
    this.addTypeForm = this.frmBuilder.group({
      description : new FormControl('', Validators.required),
    })
  }

  loadData(){
    this.bookingInfoService.getAllParcelType().subscribe(res => {
      console.log(res)
      this.typeList = res
    })
  }
  addType() {
    this.bookingInfoService.addParcelType(this.addTypeForm.value).subscribe(res =>{
      console.log(res)
    },(err : HttpErrorResponse) => {
      if(err.status === 200) {
          this.presentToast()
          this.addTypeForm.reset()
          this.loadData()

        }
        if(err.status == 400){
          alert('Could not add type')
        }
      })
    
  }

  deleteType(id) {
    this.bookingInfoService.deleteParcelType(id).subscribe(res =>{
      this.deleteToast()
      this.loadData()
    },(err : HttpErrorResponse) => {
        if(err.status == 400){
          alert('Could not delete type')
        }
      })
    
  }

  async presentToast() {
    const toast = await this.toast.create({
      header: 'Parcel Type Successfully Added',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }

  async deleteToast() {
    const toast = await this.toast.create({
      header: 'The selected Parcel Type has been successfully removed from the system',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }

  async Alert(id){
    const alert = await this.alertController.create({
      message : 'Are you sure that you want to delete the selected parcel type?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {this.deleteType(id)}
        }
      ] 
    });
    await alert.present();
  }

}
