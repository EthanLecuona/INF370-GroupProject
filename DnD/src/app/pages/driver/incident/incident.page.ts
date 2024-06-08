import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, AlertController, ViewWillEnter } from '@ionic/angular';
import { MaintenanceService } from 'src/app/services/admin/maintenance/maintenance.service';
import { IncidentService } from 'src/app/services/driver/incident.service';
import { UserService } from 'src/app/services/user/user.service';
let data
@Component({
  selector: 'app-incident',
  templateUrl: './incident.page.html',
  styleUrls: ['./incident.page.scss'],
})

export class IncidentPage implements OnInit, ViewWillEnter {
  activateTab: string = 'current'
  type: string = "current"
  incidentForm : FormGroup
  Incident : {}
  editIncident : {}
  newMaintenance : {}
  incidentList : any[] =[]
  pastIncidentList : any[] =[]
  pastMaintenanceList : any[] =[]
  currentIncidentList : any[] =[]
  driverIncidentsList : any[] =[]
  pastDriverIncidentsList : any[] =[]
  currentDriverIncidentsList : any[] =[]
  mainListDates : any[] =[]
  currentSearchTerm : string;
  pastSearchTerm : string;
  deleteMaintenancelist : any[] = []
  bookedDate : Date
  idStatus 
  date = new Date()
  availabilityDate
  date1 = new Date()
  dates : {}
  
  userDetails = JSON.parse(localStorage.getItem("user"))
  role = this.userDetails.role
  id = this.userDetails.id

  constructor(private frmBuilder : FormBuilder, private incidentRepos : IncidentService, private toast : ToastController, private route : Router, private alertController: AlertController, public userService: UserService) { }

  tabChange(e){
    this.activateTab = e.target.value;
    this.currentDriverIncidentsList = []
    this.currentIncidentList = []
    this.pastDriverIncidentsList = []
    this.pastIncidentList = []
    this.incidentList = []
    this.driverIncidentsList = []
    this.loadData()
  }

  ngOnInit() {
   
  }

  ionViewWillEnter(){
    this.loadData()
  }

   loadData(){
     this.incidentRepos.GetAllIncidents().subscribe(res=>{
      this.incidentList = res
      console.log(this.incidentList)

      for(var i =0; i < this.incidentList.length; i++){

        if(this.incidentList[i].incidentStatusId == 2){
          this.pastIncidentList.push(this.incidentList[i])
        }
        else if(this.incidentList[i].incidentStatusId == 1){
          this.currentIncidentList.push(this.incidentList[i])
        }
      }})

      if(this.role == 'driver'){
        this.incidentRepos.GetDriverIncidents(this.id).subscribe(res=>{
          this.driverIncidentsList = res
          for(var i =0; i < this.driverIncidentsList.length; i++){
    
            if(this.driverIncidentsList[i].incidentStatusId == 2){
              this.pastDriverIncidentsList.push(this.driverIncidentsList[i])
              console.log(this.pastDriverIncidentsList)
            }
            else if(this.driverIncidentsList[i].incidentStatusId == 1){
              this.currentDriverIncidentsList.push(this.driverIncidentsList[i])
              console.log(this.currentDriverIncidentsList)
            }
          }})
      }
      

  }

  resolveIncident(id, rData){
    this.incidentRepos.GetIncident(id).subscribe(res =>{
      this.Incident = res
   

    this.editIncident = {
      Location : this.Incident['location'],
      Date : this.Incident['date'],
      Description : this.Incident['description'],
      IncidentStatus_ID : 2,
      resolveMethod : rData
      }
    console.log(this.Incident['incidentId'])
    this.incidentRepos.EditIncident(this.Incident['incidentId'], this.editIncident).subscribe(res =>{
      console.log(res)

      this.currentDriverIncidentsList = []
      this.currentIncidentList = []
      this.pastDriverIncidentsList = []
      this.pastIncidentList = []
      this.incidentList = []
      this.driverIncidentsList = []
     this.loadData()
    })
    })
  }

  async resolveIncidentAlert(id){
    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader : 'Resolve Incident',
      message : 'Please Provide resolution method!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'CONFIRM',
          role: 'confirm',
          handler:  data => {this.resolveIncident(id, data.Reason), this.presentToast(), console.log(data.Reason)}
        }
      ],
      inputs: [{
        name : 'Reason',
        type: 'textarea',
        placeholder: 'Method',
      }]
      
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toast.create({
      header: 'Incident Resolved',
      message: 'The Incident was resolved successfully!',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }
}
