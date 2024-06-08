import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ɵclearResolutionOfComponentResourcesQueue } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController, ViewWillEnter } from '@ionic/angular';
import { DriverService } from 'src/app/services/driver/driver.service';

@Component({
  selector: 'app-add-rating',
  templateUrl: './add-rating.page.html',
  styleUrls: ['./add-rating.page.scss'],
})
export class AddRatingPage implements OnInit, ViewWillEnter {
  addRatingForm : FormGroup
  newRating : {}
  driverListList : any[] =[]
  ratingList : any[] =[]
  searchTerm : string;
  constructor(private frmBuilder : FormBuilder, private driverRepos : DriverService, private toast : ToastController, private route : Router, private alertController : AlertController) { }

  ngOnInit() {
    this.addRatingForm = this.frmBuilder.group({
      rating : new FormControl('', [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')])
    });
    this.loadData()
  }

ionViewWillEnter(){
  this.loadData()
}
  loadData(){
    this.driverRepos.GetAllDrivers().subscribe(res=>{
      this.driverListList = res
      console.log(this.driverListList)
    })

    this.driverRepos.GetAllRatings().subscribe(res =>{
      this.ratingList = res
      console.log(this.ratingList)
    })
  }

  async addAlert(){
    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader : 'Add Rating',
      message : 'Are you sure you want to add the Rating',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'CONFIRM',
          role: 'confirm',
          handler: () => {this.addRating()}
        }
      ]
      
    });
    await alert.present();
  }

  addRating(){
    this.newRating = {
      Rating : this.addRatingForm.controls['rating'].value
    }

    this.driverRepos.AddRating(this.newRating).subscribe(res =>{
      console.log(res)
    },(err : HttpErrorResponse) => {
      if(err.status === 400) {
        alert('Please make sure all rating info is filled in.')
      }
      if(err.status === 403) {
        alert('That rating already exists')
      }
      if(err.status === 200) {
          this.presentToast()
          this.ratingList = []
          this.loadData()
          this.addRatingForm.reset()
      }
    })
  }

  async presentToast() {
    const toast = await this.toast.create({
      header: 'Rating ',
      message: ' Rating successfully added.',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }
}
