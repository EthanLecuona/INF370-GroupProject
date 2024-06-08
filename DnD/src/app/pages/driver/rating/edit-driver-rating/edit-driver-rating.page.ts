import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController, ViewWillEnter } from '@ionic/angular';
import { DriverService } from 'src/app/services/driver/driver.service';

@Component({
  selector: 'app-edit-driver-rating',
  templateUrl: './edit-driver-rating.page.html',
  styleUrls: ['./edit-driver-rating.page.scss'],
})
export class EditDriverRatingPage implements OnInit, ViewWillEnter {

  driverRating : {}
  editRatingForm : FormGroup
  ratingsList : any[] =[]
  ratingID : {}
  rating :{}
  user = JSON.parse(localStorage.getItem("userDetails"))
  id = this.user.id

  constructor(private frmBuilder : FormBuilder, private driverRepos : DriverService,
     private toast : ToastController, private route : ActivatedRoute, private router: Router, private alertController: AlertController) { }

  ngOnInit() {

    this.editRatingForm = this.frmBuilder.group({
      rating : new FormControl('', Validators.required)
    })

  }

  ionViewWillEnter(){
    this.loadData()
  }

  loadData(){
    this.driverRepos.GetDriverRatingByID(this.route.snapshot.params['id']).subscribe(res =>{
      this.driverRating = (res)
      this.driverRepos.GetRating(this.driverRating['ratingId']).subscribe(res =>{
        this.rating = res
        console.log(this.rating['rating1'])
        console.log(this.driverRating)

        this.driverRepos.GetAllRatings().subscribe(res =>{
          this.ratingsList = res
          console.log(this.ratingsList)
        })

        this.editRatingForm.setValue({
          rating : this.rating['rating1'],
          
        })  
      })
      
    })
  }
  async editRatingAlert(){
    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader : 'Edit Driver Rating',
      message : 'Are you sure you want to edit the Drivers Rating',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {this.editRating()}
        }
      ]
      
    });
    await alert.present();
  }
  
  modChange(e){
    this.driverRepos.getRatingByRating(this.editRatingForm.controls['rating'].value).subscribe(res =>{
      this.ratingID = res
      console.log(this.ratingID)
    })
  }

  editRating(){
    this.driverRepos.getRatingByRating(this.editRatingForm.controls['rating'].value).subscribe(res =>{
      this.ratingID = res
      console.log(this.ratingID)
    })
    var newRating ={
      ratingId : this.ratingID['ratingId'],
      driverUserId : this.driverRating['driverUserId'],
      date : new Date().toISOString()
    }

    console.log(newRating)
    this.driverRepos.editDriverRating(this.route.snapshot.params['id'], newRating).subscribe(res =>{
      console.log(res)
      this.router.navigate(['/driver/rating/add-driver-rating']).then(() => {
        this.presentToast()
      })
    })
   
  }

  async presentToast() {
    const toast = await this.toast.create({
      header: 'Driver Rating ',
      message: 'Driver Rating successfully updated.',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }

}
