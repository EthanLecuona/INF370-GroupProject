import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.page.html',
  styleUrls: ['./app-settings.page.scss'],
})
export class AppSettingsPage implements OnInit {
  editLogoutTimerForm: FormGroup
  constructor(private fb: FormBuilder,
    private appComponent: AppComponent,
    private adminService: AdminService,
    private toast: ToastController,
    private router: Router) { }

  ngOnInit() {
    this.editLogoutTimerForm = this.fb.group({
      logoutTimer : new FormControl('', [Validators.required])
    })

    this.adminService.GetLogoutTimer().subscribe(
      (res) => {
        this.fetchData(res)
      },
      (err: HttpErrorResponse) => {
        if(err.status === 200){
        }
        if(err.status === 400){
        }
      }
    )
  }
  back(){
    this.router.navigateByUrl("admin")
  }

  async successToast() {
    const toast = await this.toast.create({
      header: 'Logout Timer',
      message: 'Logout Timer Edited Successfully.',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }

  async errorToast() {
    const toast = await this.toast.create({
      header: 'Logout Timer',
      message: 'Could not update logout timer, server may be down for maintenance.',
      position: 'top',
      animated: true,
      color: 'danger',
      duration: 2000,
    });
    toast.present();
  }

  fetchData(res){
    this.editLogoutTimerForm.setValue({
      logoutTimer: res['logoutTimer']
    })
  }

  submit(){
    var seconds = this.editLogoutTimerForm.controls['logoutTimer'].value
    this.adminService.UpdateLogoutTimer(seconds).subscribe(
      (res) => {
        console.log(res)
      },
      (err: HttpErrorResponse) => {
        if(err.status === 200){
          this.successToast()
          this.appComponent.idle.setTimeout(seconds)
        }
        if(err.status === 400){
          this.errorToast()
        }
      }
    )
  }
}
