import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { BookinginfoService } from 'src/app/services/system/bookinginfo.service';

@Component({
  selector: 'app-parcel-priority',
  templateUrl: './parcel-priority.page.html',
  styleUrls: ['./parcel-priority.page.scss'],
})
export class ParcelPriorityPage implements OnInit {

  addPriorityForm : FormGroup
  priorityList : any[] = []

  constructor(private bookingInfoService : BookinginfoService, private frmBuilder: FormBuilder, private toast : ToastController, private routes: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.loadData()

    this.addPriorityForm = this.frmBuilder.group({
      priority : new FormControl('', Validators.required),
    })
  }

  loadData(){
    this.bookingInfoService.getAllParcelPriority().subscribe(res => {
      console.log(res)
      this.priorityList = res
    })
  }
  addPriority() {
    this.bookingInfoService.addParcelPriority(this.addPriorityForm.value).subscribe(res =>{
      console.log(res)
    },(err : HttpErrorResponse) => {
      if(err.status === 200) {
          
          this.presentToast()
          this.addPriorityForm.reset()
          this.loadData()

        }
        if(err.status == 400){
          alert('Could not add priority')
        }
      })

    
  }

  deletePriority(id) {
    this.bookingInfoService.deleteParcelPriority(id).subscribe(res =>{
     this.loadData()
    },(err : HttpErrorResponse) => {
        if(err.status == 400){
          alert('Could not delete priority')
        }
      })
  }

  async presentToast() {
    const toast = await this.toast.create({
      header: 'Parcel Priority Successfully Added',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }

  async deleteToast() {
    const toast = await this.toast.create({
      header: 'The selected Parcel Priority has been successfully removed from the system',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }

  async Alert(id){
    const alert = await this.alertController.create({
      message : 'Are you sure that you want to delete the selected parcel priority?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {this.deletePriority(id)}
        }
      ] 
    });
    await alert.present();
  }

}
