import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController, ViewDidEnter, ViewWillEnter } from '@ionic/angular';
import { until } from 'protractor';
import { repeat } from 'rxjs/operators';
import { MaintenanceService } from 'src/app/services/admin/maintenance/maintenance.service';
import { VehicleService } from 'src/app/services/admin/vehicle/vehicle.service';

let regTrue 
let regFalse 
let dateTrue 
let dateFalse 
let MainMap
@Component({
  selector: 'app-add-maintenance',
  templateUrl: './add-maintenance.page.html',
  styleUrls: ['./add-maintenance.page.scss'],
})
export class AddMaintenancePage implements  OnInit, ViewWillEnter {

  addMaintenanceForm : FormGroup
  newMaintenance : {}
  vehicleData : any[] =[]
  mechanicList : any[] =[]
  vehicle : any[] =[]
  vehicleList : any[] =[]
  date : Date
  email : {}
  CurrentDate = new Date().toISOString()
  vehicleIndex : number
  mechanicIndex : number
  i : number
  j : number
  
  constructor(private frmBuilder : FormBuilder, private vehicleRepos : VehicleService,private maintenanceRepos : MaintenanceService ,
    private toast : ToastController, private route : Router,private alertController: AlertController) { }

    ngOnInit() {
      this.addMaintenanceForm = this.frmBuilder.group({
      
        registrationNumber : new FormControl('',Validators.required),
        // recordedKM : new FormControl('',[Validators.required, Validators.pattern('^[0-9*/+]+$')]),
        date : new FormControl('',Validators.required),
        mechanic : new FormControl('',Validators.required),
      })
    }

    ionViewWillEnter() {
    
    this.loadData()
  }

  loadData(){

    this.maintenanceRepos.getMechanic().subscribe(res =>{
      this.mechanicList = res
      console.log(this.mechanicList)
    })

    this.vehicleRepos.getVehcileAttributes().subscribe(res =>{
      if(res){
        this.vehicleList = res;
        console.log(this.vehicleList)
          for(var i = 0; i < this.vehicleList.length; i++){
            if(this.vehicleList[i]['activated'] == true){
              this.vehicleData.push(this.vehicleList[i])
            }
          }
          console.log(this.vehicleData)
        }
      }) 
  }

  addMaintenance(){

    console.log(this.addMaintenanceForm.controls['date'].value,)
    this.newMaintenance = {
      // RecordedKM : this.addMaintenanceForm.controls['recordedKM'].value,
      Date : this.addMaintenanceForm.controls['date'].value.split('T')[0],
      RegistrationId : this.addMaintenanceForm.controls['registrationNumber'].value.split(',')[0],
      MechanicId : this.addMaintenanceForm.controls['mechanic'].value[0],
      Confirmed : false
    }
    
    this.email = {
      ToEmail :  this.mechanicList[this.addMaintenanceForm.controls['mechanic'].value[2]].mechanicEmail,
      Subject : 'Vehicle Maintenance',
      Body : 'Good Day Please schedule vehicle with Registration Number: '+ this.vehicleData[this.addMaintenanceForm.controls['registrationNumber'].value.split(',')[1]].registrationNumber + ' for service on ' + this.addMaintenanceForm.controls['date'].value.split('T')[0]
    }
     
    this.maintenanceRepos.getMaintenance().subscribe(res =>{
       MainMap = res
      console.log(MainMap)
      var id = this.addMaintenanceForm.controls['registrationNumber'].value.split(',')[0] 

        for(var i = 0; i<MainMap.length; i++){
          if(MainMap[i].registrationId == id){
            regTrue = true
          
          }
        }

          if(regTrue === true  && MainMap.map(obj => obj.date.split('T')[0]).indexOf(this.addMaintenanceForm.controls['date'].value.split('T')[0]) > -1){
            alert('Vehicle already scheduled for maintenance on that day')
          }
          else{
            this.maintenanceRepos.addMaintenance(this.newMaintenance).subscribe(res =>{
            
            },(err : HttpErrorResponse) => {
                  if(err.status === 400) {
                    alert('Please make sure all maintenance info is filled in.')
                    regTrue = false
                  }
                  if(err.status === 200) {
                    this.maintenanceRepos.sendEmail(this.email).subscribe(res =>{
                    })    
                    this.route.navigate(['/admin/vehicle/maintenance']).then(() => {
                      this.presentToast()
                    })
                  }
                })
          }
      
    })
    
  }

  async addMaintenanceAlert(){
    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader : 'Add Maintenance',
      message : 'Are you sure you want to schedule the Maintenance, please confirm Maintenace when email confirmation received',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'CONFIRM',
          role: 'confirm',
          handler: () => {this.addMaintenance()}
        }
      ]
      
    });
    await alert.present();
  }
  
  async presentToast() {
    const toast = await this.toast.create({
      header: 'Vehicle Maintenance',
      message: 'The new vehicle Maintenance was scheduled successfully!',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }


}
