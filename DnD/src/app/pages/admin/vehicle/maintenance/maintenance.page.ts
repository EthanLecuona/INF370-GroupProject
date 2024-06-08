import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController, ViewDidEnter, ViewWillEnter } from '@ionic/angular';
import { MaintenanceService } from 'src/app/services/admin/maintenance/maintenance.service';



@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.page.html',
  styleUrls: ['./maintenance.page.scss'],
})
export class MaintenancePage implements OnInit, ViewWillEnter {
  activateTab: string = 'confirmed'
  type: string = "confrimed"
  itemIndex : number
  addMaintenanceForm : FormGroup
  email : {}
  newMaintenance : {}
  maintenanceList : any[] =[]
  pastMaintenanceList : any[] =[]
  currentMaintenanceList : any[] =[]
  tbcMaintenanceList : any[] =[]
  mainListDates : any[] =[]
  currentSearchTerm : string;
  tbdSearchTerm : string;
  pastSearchTerm : string;
  deleteMaintenancelist : any[] = []
  bookedDate : Date
  currentDate 
  date = new Date()
  availabilityDate
  date1 = new Date()
  dates : {}
  availability : boolean 
  con = true 
  tbcMaintenance : {}
  constructor(private frmBuilder : FormBuilder, private maintenanceRepos : MaintenanceService, private toast : ToastController,
     private route : Router, private alertController: AlertController) { }

     ngOnInit() {
      // this.loadMaintenanceData()
    }
  
    ionViewWillEnter() {
    this.type = "confirmed"
   
    
    this.date.setDate(this.date.getDate() + 2)
    // console.log(this.date.toISOString())

    this.currentDate = this.date.toISOString()
    // console.log(this.currentDate)

    this.date1.setDate(this.date1.getDate())
    this.availabilityDate = this.date1.toISOString()
    // console.log(this.availabilityDate.split('T')[0],111)

    this.onIonViewDidEnter()
    }
  
  tabChange(e){
    this.activateTab = e.target.value;
    this.tbcMaintenanceList = []
    this.currentMaintenanceList = []
    this.pastMaintenanceList = []
    this.loadMaintenanceData()
    // console.log(1)
  }

  loadMaintenanceData(){
    this.maintenanceRepos.getMechanicAndMaintenance().subscribe(res =>{
      this.maintenanceList = res
      var data = new Date
      var data4 = data.toISOString()
     
    
      for(var i =0; i < this.maintenanceList.length; i++){
       
        if(this.maintenanceList[i].confirmed === false && this.maintenanceList[i].date.split('T')[0] > this.availabilityDate.split('T')[0]){
          this.tbcMaintenanceList.push(this.maintenanceList[i])
        }
        else if(this.maintenanceList[i].confirmed === true && this.maintenanceList[i].date.split('T')[0] > this.availabilityDate.split('T')[0]) {
          this.currentMaintenanceList.push(this.maintenanceList[i])
        }
        
        if(this.maintenanceList[i].date.split('T')[0] < this.availabilityDate.split('T')[0]){
          this.pastMaintenanceList.push(this.maintenanceList[i])
          
        }
       
      }
  })

 
  }


  async presentToast() {
    const toast = await this.toast.create({
      header: 'Maintenance Removed',
      message: 'The delivery vehicle scheduled maintenace removed and email sent successfully!',
      position: 'top',
      animated: true,
      color: 'primary',
      duration: 2000,
    });
    toast.present();
  }

  async presentAlertConfirm(id, i){
    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader : 'Add Maintenance',
      message : 'Are you sure you want to confirm the Maintenance.',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'CONFIRM',
          role: 'confirm',
          handler: () => {this.confirmMaintenance(id)}
        }
      ]
      
    });
    await alert.present();
  }

  async presentDeleteAlert(id, i){
    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader : 'Remove Maintenance',
      message : 'Are you sure you want to Remove the Maintenance.',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'CONFIRM',
          role: 'confirm',
          handler: () => {this.delMaintenance(id), this.presentToast()}
        }
      ]
      
    });
    await alert.present();
  }

  confirmMaintenance(id){
    this.maintenanceRepos.getMaintenanceByID(id).subscribe(res =>{
      this.tbcMaintenance = res
      // console.log(id, this.tbcMaintenance)
      this.maintenanceRepos.confirmMaintenance(id, true).subscribe(res =>{

        this.tbcMaintenanceList = []
        this.currentMaintenanceList = []
        this.pastMaintenanceList = []
        this.loadMaintenanceData()
      })
    })
    
  }

  async presentAlert(id, i) {
    this.bookedDate = this.maintenanceList[i].date.split('T')[0]
    console.log(this.bookedDate)
    console.log(this.currentDate)
    this.email = {
      ToEmail : this.maintenanceList[i].email,
      Subject : 'Cancelled scheduled maintenance',
      body : 'Good day Please unschedule service for the Vehicle with Registration Number: ' + this.maintenanceList[i].regNumber + ' on ' + this.maintenanceList[i].date.split('T')[0],
    }

    console.log(this.email)

    if(this.currentDate.split('T')[0] < this.bookedDate){
      const alert = await this.alertController.create({
        header: 'Alert!',
        subHeader : 'Remove Maintenance',
        message : 'Are us sure you want to remove the scheduled maintenance for this vehicle',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {  }
          },
          {
            text: 'OK',
            role: 'confirm',
            handler: () => { this.delMaintenance(id), this.maintenanceRepos.sendEmail(this.email).subscribe(res =>{
              console.log(res,11)
            }),  this.presentToast() }
          }
        ]
      });
  
      await alert.present();
    }
    else if(this.currentDate.split('T')[0] === this.bookedDate || this.currentDate.split('T')[0] > this.bookedDate ){
      const alert = await this.alertController.create({
        header: 'Alert!',
        subHeader : 'Remove Maintenance',
        message : 'Maintenance cannot be removed within 2 days of maintenance date without incuring a fee, are you sure you want to continue',
        buttons: [
          {
            text: 'CANCEL',
            role: 'cancel',
            handler: () => {  }
          },
          {
            text: 'CONFIRM',
            role: 'confirm',
            handler: () => { this.delMaintenance(id), this.maintenanceRepos.sendEmail(this.email).subscribe(res =>{
              console.log(res,11)
            }),  this.presentToast()}
          }
        ]
      });
      await alert.present();
    }
  }

  delMaintenance(id){
    this.maintenanceRepos.deleteMaintenance(id).subscribe(res =>{
      this.tbcMaintenanceList = []
        this.currentMaintenanceList = []
        this.pastMaintenanceList = []
        this.loadMaintenanceData()
    })
  }
  
  onIonViewDidEnter() {
    this.maintenanceRepos.getMaintenance().subscribe(res =>{
      this.mainListDates = res
      console.log(this.mainListDates, 123)
      
      for(var i = 0; i < this.mainListDates.length; i++){
        
        
        if(this.availabilityDate.split('T')[0] === this.mainListDates[i].date.split('T')[0]){
          console.log(this.availabilityDate.split('T')[0], this.mainListDates[i].date.split('T')[0], 1111 )
          this.availability = false
          this.maintenanceRepos.setAvailabilityTrue(this.mainListDates[i].registrationId, this.availability)
          console.log(this.mainListDates[i].registrationId, this.availability, 456)
          
        }
      
      }

      for(var i = 0; i < this.mainListDates.length; i++){
        
        if(this.availabilityDate.split('T')[0] != this.mainListDates[i].date.split('T')[0]){
          console.log(this.availabilityDate.split('T')[0], this.mainListDates[i].date.split('T')[0], 123456 )
          this.availability = true
          this.maintenanceRepos.setAvailabilityTrue(this.mainListDates[i].registrationId, this.availability)
          console.log(this.mainListDates[i].registrationId, this.availability, 789)
        }
      }
    }) 
  }
}
