import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController, ViewWillEnter } from '@ionic/angular';
import { VehicleService } from 'src/app/services/admin/vehicle/vehicle.service';

@Component({
  selector: 'app-edit-model',
  templateUrl: './edit-model.page.html',
  styleUrls: ['./edit-model.page.scss'],
})
export class EditModelPage implements OnInit, ViewWillEnter {
  editVehicleModelForm : FormGroup
  modelList : {}
  updatedModel: {}
  constructor(private vehicleRepos : VehicleService, private frmBuilder : FormBuilder, private route: ActivatedRoute, private toast : ToastController, private routes : Router, private alertController: AlertController) { }

  ngOnInit() {
    

    this.editVehicleModelForm = this.frmBuilder.group({
      modelTitle : new FormControl('', Validators.required),
      modelCode : new FormControl('', Validators.required),
  })
  }

  ionViewWillEnter(){
    this.onLoadVehicle()
  }
  
  onLoadVehicle(){
    this.vehicleRepos.getModel(this.route.snapshot.params['id']).subscribe(res =>{
      this.modelList = (res)
      console.log(this.modelList)
    
        this.editVehicleModelForm.setValue({
          modelTitle : this.modelList['modelTitle'],
          modelCode : this.modelList['modelCode'],
        })  
    })
  }
  
  async editVehicleModel(){
    this.updatedModel = {
      manufacturer_ID : this.modelList['manufacturerId'],
      modelCode : this.editVehicleModelForm.controls['modelCode'].value,
      modelTitle : this.editVehicleModelForm.controls['modelTitle'].value,
    }
      console.log(this.updatedModel)
      this.vehicleRepos.editModel(this.modelList['modelId'] ,this.updatedModel).subscribe(res =>{
        console.log(res)
      },(err : HttpErrorResponse) => {
          if(err.status === 200) {
            this.routes.navigate(['/admin/vehicle/manufacturer-model/model']).then(() => {
              this.presentToast()
            })
            
          }
          if(err.status === 400) {
            alert('Please make sure all maintenance info is filled in.')
          }
          if(err.status === 403) {
            alert('Vehicle model with that name already exists.')
          }
        })
  }

  async editModelAlert(){
    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader : 'Edit Vehicle Model',
      message : 'Are you sure you want to Edit the Vehicle Model',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'CONFIRM',
          role: 'confirm',
          handler: () => {this.editVehicleModel()}
        }
      ]
      
    });
    await alert.present();
  }

  async delModelAlert(){
    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader : 'Delete Vehicle Model',
      message : 'Are you sure you want to delete the Vehicle Model',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {this.delModel()}
        }
      ]
      
    });
    await alert.present();
  }
  
  async presentToast() {
    const toast = await this.toast.create({
      header: 'Vehicle Updated',
      message: 'The Vehicle model was updated successfully!',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }

  async delModel(){
    this.vehicleRepos.getAllVehicles().subscribe(res =>{
      var vehicles = res
      console.log(vehicles)
      console.log(this.modelList['modelId'])
      console.log(vehicles.map(obj => obj.vehicleClassId).indexOf(this.modelList['modelId'])  > -1 )
      
     
         
      if(vehicles.map(obj => obj.modelId).indexOf(this.modelList['modelId']) > -1  ){
        alert('Vehicle connected to the model, cant delete')
        }
        else{
          this.vehicleRepos.deleteVehicleModel(this.modelList['modelId']).subscribe(res =>{
            console.log(res)
             this.routes.navigate(['/admin/vehicle/manufacturer-model/model']).then(() => {
                this.deleteToast()
              })
          },(err : HttpErrorResponse) => {
            if(err.status === 400) {
              alert('Vehicle Model not found.')
              
            }
            if(err.status === 403) {
              alert('Vehicle model with that name already exists.')
            }
          })
      }
    })
  

  }

  async deleteToast() {
    const toast = await this.toast.create({
      header: 'Model Deleted',
      message: 'The vehicle model was deleted successfully!',
      position: 'top',
      animated: true,
      color: 'primary',
      duration: 2000,
    });
    toast.present();
  }
}
