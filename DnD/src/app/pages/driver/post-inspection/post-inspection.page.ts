import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { NotificationService } from 'src/app/services/system/notification.service';

@Component({
  selector: 'app-post-inspection',
  templateUrl: './post-inspection.page.html',
  styleUrls: ['./post-inspection.page.scss'],
})
export class PostInspectionPage implements OnInit {

  InspectionForm : FormGroup
  selectedFiles? : FileList
  checkedTires : boolean = false
  images : string = ''
  userId  : {} = {}
  
  constructor(private toast : ToastController, private frmBuilder : FormBuilder, private notification : NotificationService) { 
    
  }

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('user'))
    this.checkedTires = false
    this.InspectionForm = this.frmBuilder.group({
      postInspectionOdometer : new FormControl('',Validators.required),
      postInspectionNotes : new FormControl('',Validators.required)
    })
  }

  completeInspection() {
    // this.notification.postInspection(this.images, this.checkedTires, this.InspectionForm, this.userId['id']).subscribe(res => {
    //   console.log(res)
    //   this.postInspectionSuccess()
    // }, (err : HttpErrorResponse) => {
    //   if(err.status == 400) {
    //     this.postInspectionFail()
    //   }
    // })
    this.postInspectionSuccess()
  }

  async openGallery(e : any) {
    const selectedFiles = [...e.target.files].map(file => {
      if(file.type != 'image/jpeg') {
        alert('Does not support any other file format than Jpeg!')
      } else {
        const reader = new FileReader()
        return new Promise(resolve => {
          reader.onload = () => resolve(reader.result)
          reader.readAsDataURL(file)
        })
      }
    })
    const res = await Promise.all(selectedFiles)
    for(var i = 0; i < res.length; i++) {
      this.images += '@' + res[i]
    }
  }

  checkTires(event : any) {
    console.log(event)
    if(event['detail']['checked']){
      event.checked = true;
      this.checkedTires = true
      console.log(this.checkedTires)
    } else {
      event.checked = false
      this.checkedTires = false
      console.log(this.checkedTires)
    }
  }

  async postInspectionSuccess() {
    const toast = await this.toast.create({
      header: 'Post-Trip Inspection Complete',
      message: 'Vehicle Post-Trip Inspection complete, Welcome back!',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 3000,
    });
    toast.present();
  }

  async postInspectionFail() {
    const toast = await this.toast.create({
      header: 'Post-Trip Inspection Failed',
      message: 'Vehicle Post-Trip Inspection invalid, Please try again!',
      position: 'top',
      animated: true,
      color: 'danger',
      duration: 3000,
    });
    toast.present();
  }
}
