import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController, ViewWillEnter } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-edit-user-role',
  templateUrl: './edit-user-role.page.html',
  styleUrls: ['./edit-user-role.page.scss'],
})
export class EditUserRolePage implements OnInit {
  role : {}
  editRoleForm : FormGroup
  constructor(private userService : UserService,  private frmBuilder : FormBuilder, private route: ActivatedRoute,
     private toast : ToastController, private routes : Router, private alertController: AlertController) { }

  ngOnInit() {

    this.editRoleForm = this.frmBuilder.group({
      role : new FormControl('', [Validators.required, Validators.pattern(('^.*[a-zA-Z].*$'))])
    })

    this.userService.getRolebyID(this.route.snapshot.params['id']).subscribe(res =>{
      this.role = (res)
      console.log(this.role)
        this.editRoleForm.setValue({
          role : this.role['name'],
        })  
    })
  }

  


  editRole(){
    var newRole = {
      RoleName : this.editRoleForm.controls['role'].value
    }

    this.userService.editRole(this.route.snapshot.params['id'], newRole).subscribe(res =>{
      console.log(res)
    },(err : HttpErrorResponse) => {
      if(err.status === 400) {
        alert('Please make sure all role info is filled in.')
      }
      if(err.status === 403) {
        alert('User role with that name alrady exist')
      }
      if(err.status === 200) {
        this.routes.navigate(['/admin/user/add-user-role']).then(() => {
          this.presentToast()
        })
      }
    })
    
  }

  removeRole(){
    this.userService.deleteRole(this.route.snapshot.params['id']).subscribe(res =>{
      this.routes.navigate(['/admin/user/add-user-role']).then(() => {
        this.deleteToast()
      })
    })
  
  }

  async editAlert(){
    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader : 'Edit Role',
      message : 'Are you sure you want to edit the Role',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {this.editRole()}
        }
      ]
      
    });
    await alert.present();
  }

  async removeAlert(){
    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader : 'Remove Role',
      message : 'Are you sure you want to remove the Role',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {this.removeRole()}
        }
      ]
      
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toast.create({
      header: ' Role ',
      message: 'The role was updated successfully.',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }

  async deleteToast() {
    const toast = await this.toast.create({
      header: 'Role',
      message: 'The role was removed successfully.',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }

}
