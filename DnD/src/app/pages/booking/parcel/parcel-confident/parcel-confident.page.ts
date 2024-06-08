import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController, ViewWillEnter } from '@ionic/angular';
import { BookinginfoService } from 'src/app/services/system/bookinginfo.service';

@Component({
  selector: 'app-parcel-confident',
  templateUrl: './parcel-confident.page.html',
  styleUrls: ['./parcel-confident.page.scss'],
})
export class ParcelConfidentPage implements OnInit, ViewWillEnter {

  addConfidentForm : FormGroup
  confidentList : any[] = []

  constructor(private bookingInfoService : BookinginfoService, private frmBuilder: FormBuilder, private toast : ToastController, private routes: Router, private alertController: AlertController) { }

  ngOnInit() {
   

    this.addConfidentForm = this.frmBuilder.group({
      confidentiality : new FormControl('', Validators.required),
    })
  }

  ionViewWillEnter() {
    this.loadData()
  }

  loadData(){
    this.bookingInfoService.getAllParcelConfident().subscribe(res => {
      console.log(res)
      this.confidentList = res
    })
  }

  addConfident() {
    this.bookingInfoService.addParcelConfident(this.addConfidentForm.value).subscribe(res =>{
      console.log(res)
    },(err : HttpErrorResponse) => {
      if(err.status === 200) {
          
          this.presentToast()
          this.addConfidentForm.reset()
          this.loadData()

        }
        if(err.status == 400){
          alert('Could not add confidentiality')
        }
      })
      
    
      }
      
  
  

  deleteConfident(id) {
    this.bookingInfoService.deleteParcelConfident(id).subscribe(res =>{
      this.deleteToast()
      this.loadData()
    },(err : HttpErrorResponse) => {
        if(err.status == 400){
          alert('Could not delete confidentiality')
        }
      })
 
  }

  async presentToast() {
    const toast = await this.toast.create({
      header: 'Parcel Confidentiality Successfully Added',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }

  async deleteToast() {
    const toast = await this.toast.create({
      header: 'The selected Parcel Confidentiality has been successfully removed from the system',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }

  async Alert(id){
    const alert = await this.alertController.create({
      message : 'Are you sure that you want to delete the selected parcel Confidentiality?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {this.deleteConfident(id)}
        }
      ] 
    });
    await alert.present();
  }

}
