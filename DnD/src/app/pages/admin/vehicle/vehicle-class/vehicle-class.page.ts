import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController, ViewWillEnter } from '@ionic/angular';
import { VehicleService } from 'src/app/services/admin/vehicle/vehicle.service';

@Component({
  selector: 'app-vehicle-class',
  templateUrl: './vehicle-class.page.html',
  styleUrls: ['./vehicle-class.page.scss'],
})
export class VehicleClassPage implements OnInit, ViewWillEnter {

  addVehicleClass : FormGroup
  classList : any[] = []
  searchTerm : string
  constructor(private frmBuilder : FormBuilder, private vehicleRepos : VehicleService, private toast : ToastController, private route : Router,  private alertController: AlertController) { }

  ngOnInit() {
    this.addVehicleClass = this.frmBuilder.group({
      description : new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z]+$')])
    })
  }

  ionViewWillEnter(){
   this.loadData()
  }

  loadData(){
    this.vehicleRepos.getAllVehicleClassId().subscribe(res =>{
      this.classList = res
    })
  }
  async addClass(){
    this.vehicleRepos.addVehicleClass(this.addVehicleClass.value).subscribe(res =>{
      console.log(res)
    },(err : HttpErrorResponse) => {
      if(err.status === 200) {
  
        this.presentToast()
        this.addVehicleClass.reset()
       
        this.classList = []
        this.loadData()
      }
      if(err.status === 400) {
        alert('Please make sure all model info is filled in.')
      }
      if(err.status === 403) {
        alert('Vehicle class with that name already exists.')
      }
    })
  }

  async delClass(id){

    this.vehicleRepos.getAllVehicles().subscribe(res =>{
      var vehicles = res
      console.log(vehicles)
      console.log(id)
      console.log(vehicles.map(obj => obj.vehicleClassId).indexOf(id)  > -1 )
      
     
         
      if(vehicles.map(obj => obj.vehicleClassId).indexOf(id) > -1  ){
        alert('Vehicle connected to the class, cant delete')
        }
        else{
          this.vehicleRepos.deleteVehicleClass(id).subscribe(res =>{
            console.log(res)
            this.delpesentToast()
            this.classList = []
            this.loadData()
            })
      }
    })
    }
    
    

  

  async deleteClassAlert(id){
    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader : 'Delete Vehicle Class',
      message : 'Are you sure you want to delete the Vehicle Class',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {this.delClass(id)}
        }
      ]
      
    });
    await alert.present();
  }

  async addClassAlert(){
    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader : 'Add Vehicle Class',
      message : 'Are you sure you want to add the Vehicle Class',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {this.addClass()}
        }
      ]
      
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toast.create({
      header: 'Vehicle Class Added',
      message: 'The new vehicle class was added successfully!',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }

  async delpesentToast() {
    const toastDel = await this.toast.create({
      header: 'Vehicle Class Deleted',
      message: 'The vehicle class was deleted successfully!',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toastDel.present();
  }
}
