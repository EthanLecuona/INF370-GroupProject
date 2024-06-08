import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { LoadingService } from 'src/app/services/system/loading.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-assign-user-role',
  templateUrl: './assign-user-role.page.html',
  styleUrls: ['./assign-user-role.page.scss'],
})
export class AssignUserRolePage implements OnInit {

  tempList
  roleList : any[] = []
  empList : any[] = []
  user : {}
  assignForm : FormGroup
  constructor(private frmBuilder : FormBuilder, private userService : UserService, private alertController: AlertController, 
     private toast: ToastController,private route : Router, private loadingService : LoadingService) { }

  ngOnInit() {

    this.assignForm = this.frmBuilder.group({
      EmployeeName : new FormControl('', Validators.required),
      RoleName : new FormControl('', Validators.required)
    })

    this.loadingService.simpleLoader()
    this.userService.getAllEmployees().subscribe(res =>{
      this.empList = res
      this.loadingService.dismissLoader()
      console.log(this.empList)
    })

    this.userService.getAllRoles().subscribe(res =>{
      this.roleList = res
      console.log(res)
    })
  }

  addToRole(){
    var roleName = this.assignForm.controls['RoleName'].value

    this.userService.getUserInformation(this.assignForm.controls['EmployeeName'].value).subscribe(res =>{
      this.user = res
      
      console.log(this.user)
      var emp = {
        userId : this.user['id'],
        userName : this.user['email'],
        isSelected : true
      }

      this.userService.addUserToRole(roleName, emp).subscribe(res =>{
        this.route.navigate(['admin/user/add-user-role']).then(() => {
          this.presentToast()
        })
      })
  
    })
  }

  async addAlert(){
    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader : 'Add Role',
      message : 'Are you sure you want to assing this user to the Role',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {this.addToRole()}
        }
      ]
      
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toast.create({
      header: ' Role ',
      message: 'User was added to the role successfully.',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }
}
