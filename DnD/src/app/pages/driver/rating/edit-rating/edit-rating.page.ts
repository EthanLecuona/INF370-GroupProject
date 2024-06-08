import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController, ViewWillEnter } from '@ionic/angular';
import { DriverService } from 'src/app/services/driver/driver.service';

@Component({
  selector: 'app-edit-rating',
  templateUrl: './edit-rating.page.html',
  styleUrls: ['./edit-rating.page.scss'],
})
export class EditRatingPage implements OnInit, ViewWillEnter {
  editRatingForm : FormGroup
  ratingList : {}
  updatedRating: {}
  constructor(private driverRepos : DriverService, private frmBuilder : FormBuilder, private route: ActivatedRoute, private toast : ToastController, private routes : Router, private alertController : AlertController) { }

  ngOnInit() {
    this.editRatingForm = this.frmBuilder.group({
      rating : new FormControl('', [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]),
  })
  }

  ionViewWillEnter(){
    this.onLoadRatings() 
  }

  onLoadRatings(){
    this.driverRepos.GetRating(this.route.snapshot.params['id']).subscribe(res =>{
      this.ratingList = (res)
      console.log(this.ratingList)
        this.editRatingForm.setValue({
          rating : this.ratingList['rating1'],
        })  
    })
  }

  async editAlert(){
    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader : 'Edit Rating',
      message : 'Are you sure you want to Edit the Rating',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'CONFIRM',
          role: 'confirm',
          handler: () => {this.editRating()}
        }
      ]
      
    });
    await alert.present();
  }
  
  editRating(){
    this.updatedRating = {
      rating : this.editRatingForm.controls['rating'].value, 
    }
      
      console.log(this.updatedRating)
      this.driverRepos.editRating(this.ratingList['ratingId'], this.updatedRating).subscribe(res =>{
        console.log(res)
      },(err : HttpErrorResponse) => {
        if(err.status === 400) {
          alert('Please make sure all rating info is filled in.')
        }
        if(err.status === 403) {
          alert('The rating already exists')
        }
        if(err.status === 200) {
          this.routes.navigate(['/driver/rating/add-rating']).then(() => {
            this.presentToast()
          })
        }
      })
     
  }

  async presentToast() {
    const toast = await this.toast.create({
      header: 'License Code Updated',
      message: 'The Rating was updated successfully!',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }

  async delAlert(){
    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader : 'Delete Rating',
      message : 'Are you sure you want to Delete the Rating',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'CONFIRM',
          role: 'confirm',
          handler: () => {this.delRating()}
        }
      ]
      
    });
    await alert.present();
  }

  async delFailAlert(){
    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader : 'Delete Rating',
      message : 'This rating is still conected to a driver, cant delete',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'CONFIRM',
          role: 'confirm',
          handler: () => {}
        }
      ]
      
    });
    await alert.present();
  }

  async delRating(){
    this.driverRepos.getDriverRatings().subscribe(res =>{
      var driverRatings = res
      console.log(driverRatings)
      if (driverRatings.map(obj => obj.ratingID).indexOf(this.ratingList['ratingId']) > -1){
        alert('This rating is still conected to a driver, cant delete')
        console.log(true)
      }
      else{
        this.driverRepos.DeleteRating(this.ratingList['ratingId']).subscribe(res =>{
          console.log(res)
        },(err : HttpErrorResponse) => {
          if(err.status === 400) {
            alert('Could not delete.')
          }
          if(err.status === 200) {
             this.routes.navigate(['/driver/rating/add-rating']).then(() => {
              this.deleteToast()
            })
          }
        })
      }
    })

   
   
  }

  async deleteToast() {
    const toast = await this.toast.create({
      header: 'Delete Rating',
      message: 'The Rating was deleted successfully!',
      position: 'top',
      animated: true,
      color: 'primary',
      duration: 2000,
    });
    toast.present();
  }
}
