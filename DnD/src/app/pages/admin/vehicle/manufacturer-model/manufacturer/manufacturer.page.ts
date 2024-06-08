import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, ViewWillEnter } from '@ionic/angular';
import { th } from 'date-fns/locale';
import { VehicleService } from 'src/app/services/admin/vehicle/vehicle.service';
import { LoadingService } from 'src/app/services/system/loading.service';

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.page.html',
  styleUrls: ['./manufacturer.page.scss'],
})
export class ManufacturerPage implements OnInit, ViewWillEnter {
  addManufacturerForm : FormGroup
  newManufacturer : {}
  vehicleMake : any[] =[]
  searchTerm : string;
  constructor(private frmBuilder : FormBuilder, private vehicleRepos : VehicleService, private toast : ToastController, private route : Router, private loadingService : LoadingService) { }

  ngOnInit() {
    this.addManufacturerForm = this.frmBuilder.group({
      ManufacturerCode : new FormControl('', [Validators.required, Validators.pattern('^.*[a-zA-Z].*$')]),
      ManufacturerTitle : new FormControl('', [Validators.required, Validators.pattern('^.*[a-zA-Z].*$')]),
    })

  }

  ionViewWillEnter(){
    this.loadVehicleData()
  }

  async addVehicleManufacturer(){
    this.newManufacturer = {
      manufacturerCode : this.addManufacturerForm.controls['ManufacturerCode'].value,
      manufacturerTitle : this.addManufacturerForm.controls['ManufacturerTitle'].value,
    }
    console.log(this.newManufacturer)

    this.vehicleRepos.addVehicleMake(this.newManufacturer).subscribe(res =>{
      console.log(res)
    },
    (err:HttpErrorResponse) => {
      if(err.status === 200){
        this.vehicleMake = []
        this.loadVehicleData()
        this.presentToast()
        this.addManufacturerForm.reset()
      }
      if(err.status === 400){
        alert('Please make sure all manufacturer info is filled in.')
      }
      if(err.status === 403) {
        alert('Manufacturer with that name already exists.')
      }
    })
  }

  async presentToast() {
    const toast = await this.toast.create({
      header: 'Vehicle Manufacturer',
      message: 'The new vehicle manufacturer was added successfully!',
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
      this.loadingService.dismissLoader()
  })

}
}
