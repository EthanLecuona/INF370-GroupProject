import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { VehicleService } from 'src/app/services/admin/vehicle/vehicle.service';
import { DriverService } from 'src/app/services/driver/driver.service';
import { IncidentService } from 'src/app/services/driver/incident.service';

@Component({
  selector: 'app-edit-incident-status',
  templateUrl: './edit-incident-status.page.html',
  styleUrls: ['./edit-incident-status.page.scss'],
})
export class EditIncidentStatusPage implements OnInit {
  editIncidentStatus : FormGroup
  statusList : {}
  updatedStatus: {}
  constructor(private incidentRepos : IncidentService, private frmBuilder : FormBuilder, private route: ActivatedRoute, private toast : ToastController, private routes : Router) { }

  ngOnInit() {
    this.onLoadStatus()

    this.editIncidentStatus = this.frmBuilder.group({
      status : new FormControl(''),
      
  })
  }

  onLoadStatus(){
    this.incidentRepos.GetIncidentStatus(this.route.snapshot.params['id']).subscribe(res =>{
      this.statusList = (res)
      console.log(this.statusList)
    
        this.editIncidentStatus.setValue({
         
          status : this.statusList['status'],
        })  
    })
  }

  editStatus(){
    this.updatedStatus = {
      
      Status1 : this.editIncidentStatus.controls['status'].value,
      
    }
      
      console.log(this.updatedStatus)
      this.incidentRepos.EditIncidentStatus(this.statusList['incidentStatusId'], this.updatedStatus)
      this.routes.navigate(['incident']).then(() => {
        this.presentToast()
      })
  }

  async presentToast() {
    const toast = await this.toast.create({
      header: 'Status Updated',
      message: 'The Status was updated successfully!',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }

  async delStatus(){
    this.incidentRepos.DeleteIncidentStatus(this.statusList['incidentStatusId'])
    await this.routes.navigate(['incident']).then(() => {
      this.deleteToast()
    })
  }

  async deleteToast() {
    const toast = await this.toast.create({
      header: 'Status Deleted',
      message: 'The Status was deleted successfully!',
      position: 'top',
      animated: true,
      color: 'primary',
      duration: 2000,
    });
    toast.present();
  }

}
