import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, ViewWillEnter } from '@ionic/angular';
import { VehicleService } from 'src/app/services/admin/vehicle/vehicle.service';
import { LoadingService } from 'src/app/services/system/loading.service';
import { Vehicle } from 'src/app/shared/interfaces/vehicle';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.page.html',
  styleUrls: ['./vehicle.page.scss'],
})
export class VehiclePage implements OnInit, ViewWillEnter {

  searchTerm : string;
  searchResults = []
  constructor(private vehicleRepos : VehicleService, 
    private frmBuilder : FormBuilder, 
    private toast: ToastController, 
    private router: Router, private loadingService : LoadingService ) { 

  }
  vehicleList : []
  activatedVehicles : Vehicle[] = []
  vehicleForm: FormGroup
  vehicleAttributes : any[] =[]
 

  ngOnInit() {
    this.vehicleForm = this.frmBuilder.group({
      registrationId : new FormControl(''),
      vehicleclassId : new FormControl('')
    })
  }

  ionViewWillEnter(){
    this.vehicleList = []
    this.activatedVehicles = []
    this.getVehicles()
  }

  async getVehicles(){
    this.loadingService.simpleLoader()
    this.vehicleRepos.getVehcileAttributes().subscribe(res =>{
      if(res){
        this.vehicleList = res;
          this.loadingService.dismissLoader()
          for(var i = 0; i < this.vehicleList.length; i++){
            if(this.vehicleList[i]['activated'] == true){
              this.activatedVehicles.push(this.vehicleList[i])
              console.log(this.activatedVehicles)
            }
          }
  
        }
      }) 

      
    }

}
