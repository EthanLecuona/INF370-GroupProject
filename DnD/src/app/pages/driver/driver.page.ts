import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonList, ToastController, ViewWillEnter } from '@ionic/angular';
import { DriverService } from 'src/app/services/driver/driver.service';
import { LoadingService } from 'src/app/services/system/loading.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.page.html',
  styleUrls: ['./driver.page.scss'],
})
export class DriverPage implements OnInit, ViewWillEnter {
  driverInfo : any[] = []
  driver : any[] = []
  drivers : any[] = []
  searchTerm : string

  userDetails = JSON.parse(localStorage.getItem("user"))
  role = this.userDetails.role
  id = this.userDetails.id
  constructor(private frmBuilder : FormBuilder, private driverRepos : DriverService, private toast : ToastController,
     private route : Router, public userService: UserService, private alertController: AlertController, private loadingService : LoadingService) { }

  ngOnInit() {
   
  }

  ionViewWillEnter(){
    this.loadData() 
  }

  loadData(){
    this.loadingService.simpleLoader()
    this.driverRepos.getDriverInfo().subscribe(res =>{
      this.driverInfo = res
      this.loadingService.dismissLoader()
      console.log(this.driverInfo)
    })

    this.driverRepos.GetAllDrivers().subscribe(res =>{
      this.drivers = res
    })

    this.driverRepos.getDriverLicense(this.id).subscribe(res =>{
      this.driver = res
      console.log(this.driver)
    })
  }

  async deleteAlert(id){
    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader : 'Delete License',
      message : 'Are you sure that you want to delete the selected License?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {this.deleteDriverInfo(id)}
        }
      ]
      
    });
    await alert.present();
  }


  deleteLicense(id){
    this.driverRepos.DeleteLicense(id)
  }

  deleteDriverInfo(id){
    this.driverRepos.DeleteDriverInfo(id).subscribe(res =>{
      console.log(res)
     
    },(err : HttpErrorResponse) => {
      if(err.status === 200) {
        this.driverInfo = []
        this.loadData()
        this.presentToast()
      }
      if(err.status === 400) {
        alert('Please make sure all maintenance info is filled in.')
      }
    })
    
  }

  async presentToast() {
    const toast = await this.toast.create({
      header: 'License Removed',
      message: 'The Drivers License was remove successfully!',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }
}
