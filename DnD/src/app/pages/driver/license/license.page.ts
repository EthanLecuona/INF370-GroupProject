import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController, ViewWillEnter } from '@ionic/angular';
import { VehicleService } from 'src/app/services/admin/vehicle/vehicle.service';
import { DriverService } from 'src/app/services/driver/driver.service';

@Component({
  selector: 'app-license',
  templateUrl: './license.page.html',
  styleUrls: ['./license.page.scss'],
})
export class LicensePage implements OnInit, ViewWillEnter {
  addLicensForm : FormGroup
  newLicense : {}
  newDriverInfo : {}
  licenseList : any[] =[]
  driverList : any[] =[]
  ratingList : any[] =[]
  codesList : any[] =[]
  vehicleList : any[] =[]
  availableVehicleList : any[] =[]
  availableDriverList : any[] =[]
  driverInfoList : any[] =[]
  driverInfoList1 : any[] =[]
  searchTerm : string;
  date : Date
  licenseIDList : any[] =[]
  CurrentDate = new Date().toISOString()
  constructor(private frmBuilder : FormBuilder, private driverRepos : DriverService,private vehicleRepos : VehicleService, private toast : ToastController, private route : Router, private alertController: AlertController) { }

  ngOnInit() {
    this.addLicensForm = this.frmBuilder.group({
      driverId : new FormControl('', Validators.required),
      licensecodeId : new FormControl('', Validators.required),
      description : new FormControl('', Validators.required),
      expDate : new FormControl('', Validators.required),
      licenseNumber : new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]),
      ratingId : new FormControl(''),
      registrationId : new FormControl('', Validators.required)
      
    })    
  }

  ionViewWillEnter(){
    this.loadData()
  }


  loadData(){
    this.driverRepos.GetAllLicense().subscribe(res=>{
      this.licenseList = res
      console.log(this.licenseList)
    })

    this.driverRepos.getAVDriverInfo().subscribe(res =>{
      this.availableDriverList = res
      console.log(this.availableDriverList)

      // this.driverRepos.getAllDriverInfo().subscribe(res =>{
      //   this.driverInfoList1 = res
      //   console.log(this.driverInfoList1)
      //   console.log(this.driverInfoList1[0].driverUserId)
      //   for(var i = 0; i < this.driverList.length; i++){
      //     if(this.driverInfoList1[i].driverUserId != this.driverList[i].id){
      //       this.availableDriverList.push(this.driverList[i])
      //       console.log(this.availableDriverList, 33)
      //     }
      //   }
      // })
      
    })

    this.driverRepos.GetAllRatings().subscribe(res =>{
      this.ratingList = res
      console.log(this.ratingList)
    })

    this.driverRepos.GetAllLicensCode().subscribe(res =>{
      this.codesList = res
      console.log(this.codesList)
    })

    this.driverRepos.getAllDriverInfo().subscribe(res =>{
      this.driverInfoList = res
      console.log(this.driverInfoList, 22)
       
      this.vehicleRepos.getAllVehicles().subscribe(res =>{
          this.vehicleList = res
          console.log(this.vehicleList)
          
        })

        this.driverRepos.getAvailableVehicles().subscribe(res =>{
      
          var avList = res
          this.availableVehicleList = avList['avVehicles']
          console.log(this.availableVehicleList)
        })
        
        
    })
   
  }

 async addLicense(){

     this.driverRepos.AddLicenseInfo(this.addLicensForm.value)
    //  this.presentToast()
  }

  async addAlert(){
    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader : 'Add License',
      message : 'Are you sure you want to add the License',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'CONFIRM',
          role: 'confirm',
          handler: () => {this.addLicense()}
        }
      ]
      
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toast.create({
      header: 'License Added',
      message: 'License has been added successfully.',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }
}
