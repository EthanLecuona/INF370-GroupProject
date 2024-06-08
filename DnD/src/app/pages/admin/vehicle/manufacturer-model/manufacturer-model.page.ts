import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, ViewWillEnter } from '@ionic/angular';
import { VehicleService } from 'src/app/services/admin/vehicle/vehicle.service';
import { LoadingService } from 'src/app/services/system/loading.service';

@Component({
  selector: 'app-manufacturer-model',
  templateUrl: './manufacturer-model.page.html',
  styleUrls: ['./manufacturer-model.page.scss'],
})
export class ManufacturerModelPage implements OnInit, ViewWillEnter {

  vehicleMake : any[] = []
  vehicleModel : any[] =[]
  MakeModel : FormGroup
  searchTerm : string;
  MakeModelList : any[] =[]
  constructor(private frmBuilder : FormBuilder, private vehicleRepos : VehicleService, private toast : ToastController, private route : Router, private loadingService : LoadingService) { }

  ngOnInit() {
       this.MakeModel = this.frmBuilder.group({
      vehicleManufacturer : new FormControl(''),
      vehicleModel : new FormControl('')
    })
    this.loadVehicleData()
  }

  ionViewWillEnter(){
    this.loadVehicleData()
  }

  loadVehicleData(){
    this.loadingService.simpleLoader()
    this.vehicleRepos.getVehicleMake().subscribe(res =>{
      this.vehicleMake = res
      console.log(res, 1)
  })

  this.vehicleRepos.getVehicleModel().subscribe(res =>{
    this.vehicleModel = res
    console.log(res, 2)
  })

  this.vehicleRepos.getVehicleModelAndModel().subscribe(res =>{
    this.MakeModelList = res
    this.loadingService.dismissLoader()
  })

  }
}
