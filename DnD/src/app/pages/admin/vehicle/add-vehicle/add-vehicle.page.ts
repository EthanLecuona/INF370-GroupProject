import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController, ViewDidEnter, ViewWillEnter } from '@ionic/angular';
import { CalendarModalOptions, MonthComponent } from 'ion2-calendar';
import { VehicleService } from 'src/app/services/admin/vehicle/vehicle.service';
import { Company } from 'src/app/shared/interfaces/company';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.page.html',
  styleUrls: ['./add-vehicle.page.scss'],
})
export class AddVehiclePage implements OnInit, ViewWillEnter {

  addVehicleForm : FormGroup
  newVehicle : {}
  vehicleClassID : any[] = []
  companyNames  : Company[] = []
  vehicleMake : any[] = []
  vehicleModel : any[] =[]
  modelList : any[] = []
  
 
  CurrentDate = new Date().toISOString()
  option : CalendarModalOptions = {
    title: 'Basic',
    canBackwardsSelected : true,
    showAdjacentMonthDay : true
    
  }
  constructor(private frmBuilder : FormBuilder, private vehicleRepos : VehicleService, private toast : ToastController, private route : Router, private alertController: AlertController) { }

  ngOnInit(){
    this.addVehicleForm = this.frmBuilder.group({
      // RegistrationNumber : new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(9), Validators.pattern('^[a-zA-Z0-9_.-]*$')]),
      // Manufacturer : new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern('^[A-Za-z]+$')]),
      // Model : new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern('^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$')]),
      // PurchaseDate : new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9*/+]+$')]),
      // VehicleClassId : new FormControl('')
      RegistrationNumber : new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(9), Validators.pattern('^[a-zA-Z0-9_.-]*$')]),
      Manufacturer : new FormControl('',[Validators.required,]),
      Model : new FormControl('', [Validators.required,]),
      PurchaseDate : new FormControl('', [Validators.required,]),
      VehicleClassId : new FormControl('', [Validators.required,])
    })
  }

  ionViewWillEnter(){
    console.log(this.CurrentDate)
    this.getVehicleClassId()
    this.loadVehicleData()
    
    
  }

  async presentToast() {
    const toast = await this.toast.create({
      header: 'Vehicle Added',
      message: 'The new delivery vehicle was added successfully!',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }

  eventChange(id){
    this.vehicleRepos.getModByManId(id).subscribe(res =>{
      this.modelList = res
      console.log(this.modelList)
    })
  }

  async addVehicle(){
    var vehicleDate = this.addVehicleForm.controls['PurchaseDate'].value
    this.newVehicle = {
      RegistrationNumber : this.addVehicleForm.controls['RegistrationNumber'].value,
      ManufacturerId : this.addVehicleForm.controls['Manufacturer'].value,
      ModelId : this.addVehicleForm.controls['Model'].value,
      ManufacturedDate : vehicleDate.split('T')[0],
      VehicleClassId : parseInt(this.addVehicleForm.controls['VehicleClassId'].value),
      Activated : true,
      Availability : true
    }

    console.log(this.newVehicle)
    this.vehicleRepos.sendVehicle(this.newVehicle).subscribe(res =>{
      console.log(res)
      this.route.navigate(['/admin/vehicle']).then(() => {
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
    // await this.route.navigate(['vehicle']).then(() => {
    //   this.presentToast()
    // })
  }

  async addVehicleAlert(){
    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader : 'Add Vehicle',
      message : 'Are you sure you want to Add the Vehicle',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {this.addVehicle()}
        }
      ]
      
    });
    await alert.present();
  }

  getVehicleClassId(){
    return this.vehicleRepos.getAllVehicleClassId().subscribe(res =>{
        this.vehicleClassID = res
    })
  }

  loadVehicleData(){
    this.vehicleRepos.getVehicleMake().subscribe(res =>{
      this.vehicleMake = res
      console.log(res)
  })

  this.vehicleRepos.getVehicleModel().subscribe(res =>{
    this.vehicleModel = res
    console.log(res)
  })


  }
}
