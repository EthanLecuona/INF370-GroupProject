import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController, ViewWillEnter } from '@ionic/angular';
import { LoadingService } from 'src/app/services/system/loading.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-user-role',
  templateUrl: './add-user-role.page.html',
  styleUrls: ['./add-user-role.page.scss'],
})
export class AddUserRolePage implements OnInit, ViewWillEnter {

  addRoleForm: FormGroup
  rolesList : any[] =[]
  searchTerm : string
  constructor(private userService : UserService, private frmBuilder : FormBuilder, 
    private toast: ToastController, private router: Router, private alertController: AlertController,
    private loadingService : LoadingService) { }

  ngOnInit() {

    this.addRoleForm = this.frmBuilder.group({
      role : new FormControl('', [Validators.required, Validators.pattern('^.*[a-zA-Z].*$')])
    })

  }

  ionViewWillEnter() {
      this.loadingService.simpleLoader()
      this.userService.getRoles().subscribe(res =>{
      this.rolesList = res
      console.log(res)
      this.loadingService.dismissLoader()
    })
  }

  addRole(){
    var newRole = {
      RoleName : this.addRoleForm.controls['role'].value
    }
    console.log(newRole)
    this.userService.addRole(newRole).subscribe(res =>{
      console.log(res)
    },(err : HttpErrorResponse) => {
      if(err.status === 400) {
        alert('User role with that name alrady exist.')
      }
      if(err.status === 403) {
        alert('User role with that name alrady exist')
      }
      if(err.status === 200) {
        
        this.userService.getRoles().subscribe(res =>{
          this.rolesList = res
          console.log(this.rolesList)
        })
        this.presentToast()

        this.addRoleForm.reset()
      }
    })
    
  }

  async addAlert(){
    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader : 'Add Role',
      message : 'Are you sure you want to add the Role',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {this.addRole()}
        }
      ]
      
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toast.create({
      header: ' Role ',
      message: 'The role was added successfully.',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }
}
