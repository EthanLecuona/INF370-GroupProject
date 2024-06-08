import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DriverService } from 'src/app/services/driver/driver.service';
import { IncidentService } from 'src/app/services/driver/incident.service';

@Component({
  selector: 'app-add-incident-status',
  templateUrl: './add-incident-status.page.html',
  styleUrls: ['./add-incident-status.page.scss'],
})
export class AddIncidentStatusPage implements OnInit {
  addStatusForm : FormGroup
  newStatus : {}
  statusList : any[] =[]
  searchTerm : string;
  constructor(private frmBuilder : FormBuilder, private incidentRepos : IncidentService, private toast : ToastController, private routes : Router) { }

  ngOnInit() {
    this.loadData()

    this.addStatusForm = this.frmBuilder.group({
      status : new FormControl('')
    })
  }


  async loadData(){
    await this.incidentRepos.GetAllIncidentsStatus().subscribe(res=>{
      this.statusList = res
      console.log(this.statusList)
    })
  }

  async addStatus(){
    this.newStatus = {
      licenseCode : this.addStatusForm.controls['status'].value
    }

    console.log(this.newStatus)
    await this.incidentRepos.AddIncidentStatus(this.newStatus)
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

}
