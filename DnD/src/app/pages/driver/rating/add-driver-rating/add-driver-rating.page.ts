import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, ViewWillEnter } from '@ionic/angular';
import { VehicleService } from 'src/app/services/admin/vehicle/vehicle.service';
import { DriverService } from 'src/app/services/driver/driver.service';
import { LoadingService } from 'src/app/services/system/loading.service';

@Component({
  selector: 'app-add-driver-rating',
  templateUrl: './add-driver-rating.page.html',
  styleUrls: ['./add-driver-rating.page.scss'],
})
export class AddDriverRatingPage implements OnInit, ViewWillEnter {
  addManufacturerForm : FormGroup
  newRating : {}
  ratingsList : any[] =[]
  searchTerm : string;

  user = JSON.parse(localStorage.getItem("userDetails"))
  id = this.user.id

  constructor(private frmBuilder : FormBuilder, private driverRepos : DriverService, private toast : ToastController, private route : Router, private loadingService : LoadingService) { }

  ngOnInit() {
   
  }

  ionViewWillEnter() {
    this.loadData()
  }

  loadData(){
    this.loadingService.simpleLoader()
    this.driverRepos.getDriverRatings().subscribe(res=>{
      this.ratingsList = res
      this.loadingService.dismissLoader()
      console.log(this.ratingsList)
    })
  }
}
