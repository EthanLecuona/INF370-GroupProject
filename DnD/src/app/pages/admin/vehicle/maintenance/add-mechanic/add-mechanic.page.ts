import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController, ViewDidEnter, ViewWillEnter } from '@ionic/angular';

import { MaintenanceService } from 'src/app/services/admin/maintenance/maintenance.service';
import { VehicleService } from 'src/app/services/admin/vehicle/vehicle.service';

@Component({
  selector: 'app-add-mechanic',
  templateUrl: './add-mechanic.page.html',
  styleUrls: ['./add-mechanic.page.scss'],
})



export class AddMechanicPage implements OnInit, ViewWillEnter{
  addMechanicForm : FormGroup
  newMechanic : {}
  mechanicList : any[] = []
  maintenanceList : any[] = []
  searchTerm : string
 
  constructor(private frmBuilder : FormBuilder, private vehicleRepos : VehicleService,private maintenanceRepos : MaintenanceService ,
    private toast : ToastController, private route : Router,  private alertController: AlertController) { }

    ngOnInit(){
      this.addMechanicForm = this.frmBuilder.group({
      
        mechanicName : new FormControl('', [Validators.required, ]),
        email : new FormControl('',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      })
    }

  ionViewWillEnter(){
    this.loadData()
  }

  loadData(){
    this.maintenanceRepos.getMechanic().subscribe(res =>{
      this.mechanicList = res
      console.log(this.mechanicList)
    })

    this.maintenanceRepos.getMaintenance().subscribe(res =>{
      this.maintenanceList = res
      console.log(this.maintenanceList)
    })
  }

  async delMechanic(id){
    let alert 
    console.log(id)
    for(var j = 0; j < this.maintenanceList.length; j++){
      if(id === (this.maintenanceList[j].mechanicId)){
         alert = await this.alertController.create({
          header: 'Alert!',
          subHeader : 'Remove Mechanic',
          message : 'Mechanics that are scheduled for maintenance cannot be removed before the maintenance has been completed or removed',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {  }
            },
            {
              text: 'OK',
              role: 'confirm',
              handler: () => { }
            }
          ]
        });
        
      }
      else if(id != this.maintenanceList[j].mechanicId){
         alert = await this.alertController.create({
          header: 'Alert!',
          subHeader : 'Remove Mechanic',
          message : 'Are you sure that you want to remove this Mechanic',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {  }
            },
            {
              text: 'OK',
              role: 'confirm',
              handler: () => { this.deleteMechanic(id)}
            }
          ]
        });
        
    }    
  } 
  await alert.present();  
}

  async addMechanic(){

    this.newMechanic = {
      MechanicName : this.addMechanicForm.controls['mechanicName'].value,
      EmailAddress : this.addMechanicForm.controls['email'].value,
    }

    console.log(this.newMechanic)
    this.maintenanceRepos.addMechanic(this.newMechanic).subscribe(res => {

    }, (err : HttpErrorResponse) => {
      if(err.status === 200) {
        this.mechanicList = []
        this.loadData()
        this.presentToast()
      } else if (err.status === 400) {
        alert('Problem adding Mechanic')
      } else if (err.status === 403) {
        alert('Mechanic already exists')
      }
    })
  }

  async deleteMechanic(id){

    this.maintenanceRepos.deleteMechanic(id).subscribe(res => {
      this.mechanicList = []
      this.loadData()
      this.deleteToast()
    }, (err : HttpErrorResponse) => {
      if(err.status === 200) {

      } else if (err.status === 400) {
        alert('Problem adding Mechanic')
      }
    })
  }

  async addMechanicAlert(){
    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader : 'Add Mechanic',
      message : 'Are you sure you want to add the Mechanic',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {this.addMechanic()}
        }
      ]
      
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toast.create({
      header: 'Mechanic',
      message: 'Mechanic has been successfully added.',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }

  async deleteToast() {
    const toast = await this.toast.create({
      header: 'Mechanic',
      message: 'Mechanic has been successfully deleted.',
      position: 'top',
      animated: true,
      color: 'primary',
      duration: 2000,
    });
    toast.present();
  }
}
