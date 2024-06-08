import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, AlertController, ViewWillEnter } from '@ionic/angular';
import { from } from 'rxjs';
import { FuelService } from 'src/app/services/fuel/fuel.service';
import { LoadingService } from 'src/app/services/system/loading.service';
import { UserService } from 'src/app/services/user/user.service';
import {Camera, CameraResultType} from '@capacitor/camera'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
let alert 
@Component({
  selector: 'app-fuel-price',
  templateUrl: './fuel-price.page.html',
  styleUrls: ['./fuel-price.page.scss'],
})
export class FuelPricePage implements OnInit, ViewWillEnter {
  addFuelForm : FormGroup
  newFuel : {}
  fuelList : any[] = []
  driverFuelPrice : any[] = []
  maintenanceList : any[] = []
  searchTerm : string
  totalPrice : any[] = []
  user = JSON.parse(localStorage.getItem("userDetails"))
  id = this.user.id
  photo
  checked : boolean

  userDetails = JSON.parse(localStorage.getItem("user"))
  role = this.userDetails.role

  public slip

  constructor(private frmBuilder : FormBuilder, private fuelRepos : FuelService ,private toast : ToastController,
     private route : Router,  private alertController: AlertController, public userService: UserService,private loadingService : LoadingService,
     private domSanitize: DomSanitizer) { }

  ionViewWillEnter(){
    this.loadData()
  }

  ngOnInit() {
    this.addFuelForm = this.frmBuilder.group({
      
      Liters : new FormControl('', [Validators.required, Validators.pattern('[0-9]+(\\.([0-9]{1,2}))?')]),
      Price : new FormControl('', [Validators.required, Validators.pattern('[0-9]+(\\.([0-9]{1,2}))?')]),
      Tyres : new FormControl(''),
    })
  }

   
  loadData(){
    this.loadingService.simpleLoader().then(() => {
      this.fuelRepos.getDriverFuelPrice(this.id).subscribe(res =>{
        this.driverFuelPrice = res
        console.log(this.driverFuelPrice)
        this.fuelRepos.getFuelInfo().subscribe(res =>{
          this.fuelList = res
          this.loadingService.dismissLoader()
          console.log(this.fuelList)
          for(var i = 0;i< this.fuelList.length; i++) {
            console.log(this.fuelList[i]['liters'])
            this.totalPrice.push((this.fuelList[i]['liters'] * this.fuelList[i]['price']))
          }
        })
      })
    })
  }

  async addFuelAlert(){
    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader : 'Add Fuel Price',
      message : 'Are you sure you want to Add the Fuel Price',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {this.addFuel()}
        }
      ]
      
    });
    await alert.present();
  }


 
  addTyrePressure(e) {
   if(e.currentTarget.checked == false){
    this.checked = true
    console.log(true)
    return this.checked
   }
   else{
    this.checked = false
    console.log(this.checked)
    return this.checked
   }
    

  }

  addFuel(){
    this.loadingService.simpleLoader()
    this.slip = this.photo
    this.newFuel = {
      Liters : this.addFuelForm.controls['Liters'].value,
      Price : this.addFuelForm.controls['Price'].value,
      DriverUser_ID : this.id,
      TimeStamp : new Date().toISOString(),
      FuelSlip : this.photo
    }
    
    console.log(this.newFuel, 1231)
    this.fuelRepos.addFuelPrice(this.newFuel).subscribe(res =>{
      console.log(res)

    },(err : HttpErrorResponse) => {
      if(err.status === 200) {
        this.fuelRepos.getFuelInfo().subscribe(res =>{
          this.fuelList = res
          this.addFuelForm.reset()
          console.log(this.fuelList)
          this.presentToast()
          this.loadingService.dismissLoader()
        })
        this.fuelRepos.getDriverFuelPrice(this.id).subscribe(res =>{
          this.driverFuelPrice = res
          console.log(this.driverFuelPrice)
        })
      }
      if(err.status === 400) {
       alert('Can add fule price')
      }
    })
  }

  async presentToast() {
    const toast = await this.toast.create({
      header: 'Fuel Added',
      message: 'Fuel has been added successfully.',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }

  async takePicture() {
    const pic = await Camera.getPhoto({
      quality : 30,
      allowEditing : false,
      resultType : CameraResultType.DataUrl,
    })

    this.photo = (pic.dataUrl)
    console.log(this.photo)
  }
}