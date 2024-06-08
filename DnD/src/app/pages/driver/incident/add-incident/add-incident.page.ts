import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController, ViewWillEnter } from '@ionic/angular';
import { DriverService } from 'src/app/services/driver/driver.service';
import { IncidentService } from 'src/app/services/driver/incident.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { getLocaleCurrencyCode } from '@angular/common';

@Component({
  selector: 'app-add-incident',
  templateUrl: './add-incident.page.html',
  styleUrls: ['./add-incident.page.scss'],
})
export class AddIncidentPage implements OnInit, ViewWillEnter {

  addIncidentForm : FormGroup
  newIncident : {}
  incidentList : any[] =[]
  statusList : any[] =[]
  searchTerm : string;
  id
  user
  lat
  lon
  watchID = null;
  date : Date
  email : {}
  CurrentDate = new Date().toISOString()
  location : string

  constructor(private frmBuilder : FormBuilder, private incidentRepos : IncidentService, private toast : ToastController, private routes : Router, private geolocation : Geolocation, private alertController: AlertController) { }

  ionViewWillEnter(){
    this.loadData()
  }
  ngOnInit() {
   
    this.user = JSON.parse(localStorage.getItem('user'))
    this.addIncidentForm = this.frmBuilder.group({
      
      description : new FormControl('', Validators.required),
    })

    console.log(this.CurrentDate.split('T')[1])
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    function success(pos) {
      const crd = pos.coords;
    
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      if ("coords" in data) {
        this.lat = data.coords.latitude.toString()
        this.lon = data.coords.longitude.toString()
        console.log(this.lat)
        console.log(this.lon)
      } else {
        // ruh roh we have a PositionError
      }
    
    this.location = this.lat + ", " + this.lon
    });
  }


  async loadData(){
    await this.incidentRepos.GetAllIncidents().subscribe(res=>{
      this.incidentList = res
      console.log(this.incidentList)
    })

    await this.incidentRepos.GetAllIncidentsStatus().subscribe(res =>{
      this.statusList = res
      console.log(this.statusList)
      if(this.statusList['status'] == 1){
        this.id = this.statusList['incidentStatusId'].value
        console.log(this.id)
      }
      else if(this.statusList['status'] == 2) {
        this.id = this.statusList['incidentStatusId'].value
        console.log(this.id)
      }
    })
  }

  addIncident(){
    
    this.newIncident = {
      Location : this.location,
      Date : this.CurrentDate,
      Description : this.addIncidentForm.controls['description'].value,
      IncidentStatus_ID : 1,
      DriverUser_ID: this.user.id,
      resolveMethod : ""
    }
    
    console.log(this.newIncident)

    this.incidentRepos.AddIncident(this.newIncident).subscribe(res =>{
      console.log(res)
      this.routes.navigate(['/driver/incident']).then(() => {
        this.presentToast()
      })
    })
  
   
  }

  async presentToast() {
    const toast = await this.toast.create({
      header: 'Incident Reported',
      message: 'Incident has been successfully reported.',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }

  async setAlert(){
    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader : 'Add Incident',
      message : 'Are you sure you want to add the Incident',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'CONFIRM',
          role: 'confirm',
          handler: () => {this.addIncident()}
        }
      ]
      
    });
    await alert.present();
  }
}
