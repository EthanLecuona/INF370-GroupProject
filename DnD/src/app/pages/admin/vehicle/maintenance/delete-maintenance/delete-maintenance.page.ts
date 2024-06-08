import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { MaintenanceService } from 'src/app/services/admin/maintenance/maintenance.service';

@Component({
  selector: 'app-delete-maintenance',
  templateUrl: './delete-maintenance.page.html',
  styleUrls: ['./delete-maintenance.page.scss'],
})
export class DeleteMaintenancePage implements OnInit {

  MaintenanceList : {}
  newEmail : {}
  maintenanceForm : FormGroup
  constructor(private frmBuilder : FormBuilder, private maintenanceRepos : MaintenanceService, private toast : ToastController, private routes : Router, private route : ActivatedRoute) { }

  ngOnInit() {
    
    this.maintenanceForm = this.frmBuilder.group({
      email : new FormControl(''),
      body : new FormControl(''),
      regNumber : new FormControl('')
    })

    this.maintenanceForm.setValue({
      email : this.MaintenanceList['EmailAddress'],
    })  

  }

  onLoadVehicle(){
    this.maintenanceRepos.getMaintenanceByID(this.route.snapshot.params['id']).subscribe(res =>{
      this.MaintenanceList = (res)
      console.log(this.MaintenanceList)
    })
  }

  async deleteMaintenance(id){
    
    this.newEmail = {
      ToEmail : this.maintenanceForm.controls['email'].value,
      Subject : 'Canceled scheduled maintenance',
      Body : this.maintenanceForm.controls['body'].value
    }
    
    this.maintenanceRepos.deleteMaintenance(id)

    
    this.maintenanceRepos.sendEmail(this.newEmail).pipe(first()).subscribe({
      next : () =>{
        console.log(this.newEmail)
      }
    })
  }

  async presentToast() {
    const toast = await this.toast.create({
      header: 'Vehicle Updated',
      message: 'The delivery vehicle was updated successfully!',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }
}
