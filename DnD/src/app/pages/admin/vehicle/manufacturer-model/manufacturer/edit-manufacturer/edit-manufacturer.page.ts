import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController, ViewWillEnter } from '@ionic/angular';
import { VehicleService } from 'src/app/services/admin/vehicle/vehicle.service';

 
@Component({
  selector: 'app-edit-manufacturer',
  templateUrl: './edit-manufacturer.page.html',
  styleUrls: ['./edit-manufacturer.page.scss'],
})
export class EditManufacturerPage implements OnInit, ViewWillEnter {
  editVehicleManufacturerForm : FormGroup
  manufacturerList : {}
  manList : any[] = []
  updatedManufacturer: {}
  constructor(private vehicleRepos : VehicleService, private frmBuilder : FormBuilder, private route: ActivatedRoute, private toast : ToastController, private routes : Router, private alertController: AlertController) { }

  ngOnInit(){
      
    this.editVehicleManufacturerForm = this.frmBuilder.group({
      manufacturerCode : new FormControl('',[Validators.required, Validators.pattern('^.*[a-zA-Z].*$')]),
      manufacturerTitle : new FormControl('',[Validators.required, Validators.pattern('^.*[a-zA-Z].*$')]),
      
  })
  }
  
  ionViewWillEnter(){
    this.onLoadVehicle()

  }

  onLoadVehicle(){
    this.vehicleRepos.getManufacturer(this.route.snapshot.params['id']).subscribe(res =>{
      this.manufacturerList = (res)
      console.log(this.manufacturerList)
    
        this.editVehicleManufacturerForm.setValue({
         
          manufacturerCode : this.manufacturerList['manufacturerCode'],
          manufacturerTitle : this.manufacturerList['manufacturerTitle'],
        })  
    })

    this.vehicleRepos.getVehicleModel().subscribe(res =>{
      this.manList = res
      console.log(this.manList)
    })
  }
  //mancode fix
  editVehicleManufacturer(){
    this.updatedManufacturer = {
      
      manufacturerCode : this.editVehicleManufacturerForm.controls['manufacturerCode'].value,
      manufacturerTitle : this.editVehicleManufacturerForm.controls['manufacturerTitle'].value,
    }
      
      console.log(this.updatedManufacturer)
      this.vehicleRepos.editManufacturer(this.manufacturerList['manufacturerId'], this.updatedManufacturer).subscribe(res =>{
        console.log(res)
      },(err : HttpErrorResponse) => {
        if(err.status === 200) {
          this.routes.navigate(['/admin/vehicle/manufacturer-model/manufacturer']).then(() => {
            this.presentToast()
          })
          
        }
        if(err.status === 400) {
          alert('Please make sure all Manufacturer info is filled in.')
        }
        if(err.status === 403) {
          alert('Manufacturer with that name already exists.')
        }
      })

      // this.routes.navigate(['manufacturer']).then(() => {
      //   this.presentToast()
      // })

  }

  async edtManufacturer(){
    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader : 'Edit Manufacturer',
      message : 'Are you sure you want to edit the current manufacturer',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'CONFIRM',
          role: 'confirm',
          handler: () => {this.editVehicleManufacturer()}
        }
      ]
      
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toast.create({
      header: 'Vehicle Updated',
      message: 'Manufacturer has been successfully updated.',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }

  async delManufacturer(){
    
    var id = this.manufacturerList['manufacturerId']

      if(this.manList.map(obj => obj.manufacturerId).indexOf(id) > -1){
        const alert = await this.alertController.create({
          header: 'Alert!',
          subHeader : 'Remove Manufacturer',
          message : 'This Manufacurer still has models on the database, those models must be removed before removing a manufacurer',
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
        await alert.present();
      }
      else if(this.manList.map(obj => obj.manufacturerId).indexOf(id) == -1){
         const alert = await this.alertController.create({
          header: 'Alert!',
          subHeader : 'Remove Manufacturer',
          message : 'Are you sure that you want to remove this Manufacturer',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {  }
            },
            {
              text: 'OK',
              role: 'confirm',
              handler: () => { this.DeleteMan()}
            }
          ]
        });
        await alert.present();
      } 
      
    }
   
  

  async DeleteMan(){

    
    this.vehicleRepos.deleteVehicleMake(this.manufacturerList['manufacturerId']).subscribe(res =>{
      console.log(res)
      this.routes.navigate(['/admin/vehicle/manufacturer-model/manufacturer']).then(() => {
        this.deleteToast()
      })
      
    },(err : HttpErrorResponse) => {
      if(err.status === 404) {
        alert('Manufacturer not found')
      }
    })

  }

  async deleteToast() {
    const toast = await this.toast.create({
      header: 'Manufacturer Deleted',
      message: 'Manufacturer removed successfully!',
      position: 'top',
      animated: true,
      color: 'primary',
      duration: 2000,
    });
    toast.present();
  }
}
