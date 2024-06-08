import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController, ViewWillEnter } from '@ionic/angular';
import { VehicleService } from 'src/app/services/admin/vehicle/vehicle.service';
import { LoadingService } from 'src/app/services/system/loading.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.page.html',
  styleUrls: ['./model.page.scss'],
})
export class ModelPage implements OnInit, ViewWillEnter {

  addModelForm : FormGroup
  newModel : {}
  vehicleMake : any[] =[]
  searchTerm : string;
  ModelList: any[] = []
  constructor(private frmBuilder : FormBuilder, private vehicleRepos : VehicleService,
     private toast : ToastController, private route : Router, private alertController: AlertController,
     private loadingService : LoadingService) { }

  ngOnInit() {
    this.addModelForm = this.frmBuilder.group({
      ManufacturerTitle : new FormControl('', Validators.required),
      ModelCode : new FormControl('',[Validators.required]),
      ModelTitle : new FormControl('', [Validators.required]),
    })
  }

  ionViewWillEnter(){
    this.loadVehicleData()
  }

  async addVehicleModel(){
    this.newModel = {
      manufacturer_ID : this.addModelForm.controls['ManufacturerTitle'].value,
      modelCode : this.addModelForm.controls['ModelCode'].value,
      modelTitle : this.addModelForm.controls['ModelTitle'].value,
    }
    console.log(this.newModel,2222)

    this.vehicleRepos.addVehicleModel(this.newModel).subscribe(res =>{
      console.log(res)  
    },(err : HttpErrorResponse) => {
          if(err.status === 200) {
      
            this.presentToast()
            this.addModelForm.reset()
            this.ModelList = []
            this.loadVehicleData()
          }
          if(err.status === 400) {
            alert('Please make sure all model info is filled in.')
          }
          if(err.status === 403) {
            alert('Vehicle model with that name already exists.')
          }
        })
   
  }

  async addModelAlert(){
    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader : 'Add Vehicle Model',
      message : 'Are you sure you want to add the Vehicle Model',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'CONFIRM',
          role: 'confirm',
          handler: () => {this.addVehicleModel()}
        }
      ]
      
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toast.create({
      header: 'Vehicle Model',
      message: 'The new vehicle model was added successfully!',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }

  loadVehicleData(){
    this.loadingService.simpleLoader()
    this.vehicleRepos.getVehicleMake().subscribe(res =>{
      this.vehicleMake = res

      console.log(res, 1)
  })

  this.vehicleRepos.getVehicleModel().subscribe(res =>{
    this.ModelList = res
    this.loadingService.dismissLoader()
    console.log(res, 1)
})
}

deleteModel(ModelId){
  console.log(ModelId)
 
 
}
}
