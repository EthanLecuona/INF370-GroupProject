import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AlertController, ToastController, ViewWillEnter } from '@ionic/angular';
import { VehicleService } from 'src/app/services/admin/vehicle/vehicle.service';
import { Vehicle } from 'src/app/shared/interfaces/vehicle';

let model1
let man
let clas
@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.page.html',
  styleUrls: ['./edit-vehicle.page.scss'],
})
export class EditVehiclePage implements OnInit, ViewWillEnter {

  editVehicleForm : FormGroup
  VehicleList : {}
  vehicleClassList : {}
  vehicleID = 0
  updatedVehicle: {}
  inactive : boolean = false
  vehicleClassID : any[] = []
  vehicleModel : any[] =[]
  modelList : any[] =[]
  vehicleMake : any[] =[]
  manufacturer : {}
  model : {}
  CurrentDate = new Date().toISOString()
  selectedModel 
  selectedMan
  modID
  manID
  av : Boolean
  avFalse : Boolean = false
  avTrue : Boolean = true

  edtMan : boolean = false
  constructor(private vehicleRepos : VehicleService, private frmBuilder : FormBuilder, private route: ActivatedRoute, private toast : ToastController, private routes : Router, private alertController: AlertController) { }

  ngOnInit() {  
    this.editVehicleForm = this.frmBuilder.group({
      vehicleRegistration : new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(9), Validators.pattern('^[a-zA-Z0-9_.-]*$')]),
      vehicleManufacturer : new FormControl('', Validators.required),
      vehicleModel : new FormControl('', Validators.required),
      vehiclePurchaseDate : new FormControl('', Validators.required),
      vehicleClassName : new FormControl('', Validators.required)
  })
  }

  ionViewWillEnter(){
    this.onLoadVehicle()
    this.getVehicleClassId()
  }

  async presentToast() {
    const toast = await this.toast.create({
      header: 'Vehicle Updated',
      message: 'The delivery vehicle was updated successfully!',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
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

  getVehicleClassId(){
    return this.vehicleRepos.getAllVehicleClassId().subscribe(res =>{
        this.vehicleClassID = res
        this.vehicleClassID.sort(this.vehicleClassID[0].description)
    })
  }

  onLoadVehicle(){
    this.vehicleRepos.getVehicle(this.route.snapshot.params['id']).subscribe(res =>{
      this.VehicleList = (res)
      this.vehicleID = this.VehicleList['vehicleClassId']
      this.vehicleRepos.getVehicleClass(this.vehicleID).subscribe(res =>{
        this.vehicleClassList = (res)
          this.vehicleRepos.getManufacturer(this.VehicleList['manufacturerId']).subscribe(res =>{
            this.manufacturer = res
              this.vehicleRepos.getModel(this.VehicleList['modelId']).subscribe(res =>{
                this.model = res
                this.editVehicleForm.setValue({
                  vehicleRegistration : this.VehicleList['registrationNumber'],
                  vehicleManufacturer : this.manufacturer['manufacturerTitle'],
                  vehicleModel : this.model['modelTitle'],
                  vehiclePurchaseDate : this.VehicleList['manufacturedDate'],
                  vehicleClassName : this.vehicleClassList['description'],
                })  
              })
          
        })
       
      })

      this.av = this.VehicleList['availability']
      this.modID = this.VehicleList['modelId']
        this.manID = this.VehicleList['manufacturerId']
      if(this.modID == this.VehicleList['modelId']){
        this.selectedModel = this.modID
      }
      
      if(this.manID == this.VehicleList['manufacturerId']){
        this.selectedMan = this.manID
      }
  
    })

    this.vehicleRepos.getVehicleMake().subscribe(res =>{
      this.vehicleMake = res
  })

  this.vehicleRepos.getVehicleModel().subscribe(res =>{
    this.vehicleModel = res
  })
  }

  manChange(event){

    this.vehicleRepos.getManufacturerByName(event).subscribe(res =>{
       man = res
      this.vehicleRepos.getModByManId(man['manufacturerId']).subscribe(res =>{
        this.modelList = res
      })
    })
  }

  modChange(model){
    this.vehicleRepos.getModelByName(model).subscribe(res =>{
       model1 = res
    })
  }

  classChange(clas1){
    this.vehicleRepos.getClassByName(clas1).subscribe(res =>{
      clas = res
   })
  }

  async editVehicleAlert(){
    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader : 'Edit Vehicle',
      message : 'Are you sure you want to Edit the Vehicle',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {this.editVehicle()}
        }
      ]
      
    });
    await alert.present();
  }

  async editVehicle(){
    this.updatedVehicle = {
      registrationNumber : this.editVehicleForm.controls['vehicleRegistration'].value,
      manufacturerId : man['manufacturerId'],
      modelId : model1['modelId'],
      manufacturedDate : this.editVehicleForm.controls['vehiclePurchaseDate'].value,
      vehicleClassId : clas['vehicleClassId'],
      activated : this.VehicleList['activated'],
      available : this.VehicleList['availability']
    }
      this.vehicleRepos.editVehicle(this.VehicleList['registrationId'],this.updatedVehicle).subscribe(res =>{
         this.routes.navigate(['admin/vehicle']).then(() => {
          this.presentToast()
        })
      },(err : HttpErrorResponse) => {
        if(err.status === 400) {
          alert('Please make sure all vehicle info is filled in.')
        }
        if(err.status === 403) {
          alert('Vehicle with this registration number already exists.')
        }
      })
      
  }

  async delVehicle(){  
    for (var i = 0; i < 1; i++){
      const alert = await this.alertController.create({
        header: 'Alert!',
        subHeader : 'Deactivate Vehicle',
        message : 'Are you sure you want to deactivate the current vehicle',
        buttons: [
          {
            text: 'CANCEL',
            role: 'cancel',
            handler: () => {  }
          },
          {
            text: 'CONFIRM',
            role: 'confirm',
            handler: () => {this.deactivate()}
          }
        ]
        
      });
      await alert.present();
    }
      
    
  } 

  deactivate(){
    this.vehicleRepos.deleteVehicle(this.VehicleList['registrationId'], this.inactive).subscribe(res =>{
      this.routes.navigate(['/admin/vehicle']).then(() => {
        this.deleteToast()
      }) 
    },(err : HttpErrorResponse) => {
      if(err.status === 400) {
        alert('Please make sure all vehicle info is filled in.')
      }
    })
    
  
  }
  
  
 async setAvailabilityAlert(){
    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader : 'Set Availability',
      message : 'Are you sure you want to change the current availability status of the vehicle',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {this.setAvailability()}
        }
      ]
      
    });
    await alert.present();
  }
  
  setAvailability(){
   if(this.VehicleList['availability'] === true)
   {
    this.av = false
    this.vehicleRepos.setVehicleAvailabilityTrue(this.VehicleList['registrationId'], this.avTrue)
   }
   else if (this.VehicleList['availability'] === false){
    this.av =true
      this.vehicleRepos.setVehicleAvailabilityFalse(this.VehicleList['registrationId'], this.avFalse)
   }
     
   this.presentToastAvailability()
   
  }

  async presentToastAvailability() {
    const toast = await this.toast.create({
      header: 'Vehicle Availability',
      message: 'Vehicle availability status successfully updated',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }
}
