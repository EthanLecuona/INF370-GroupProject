import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { BookingService } from 'src/app/services/system/booking.service';
import { LoadingService } from 'src/app/services/system/loading.service';
import { UserService } from 'src/app/services/user/user.service';

let alert
@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.page.html',
  styleUrls: ['./edit-user-profile.page.scss'],
})
export class EditUserProfilePage implements OnInit {
  userProfile
  profileForm: FormGroup
  user: any
  dates : any[] =[]
  userID: string
  schedule : any[] = []
  users : any[] =[]
  bookings : any[] =[]
  constructor(private fb: FormBuilder, private router: Router, public userService: UserService,
     private route: ActivatedRoute, private alertController: AlertController,  private toast : ToastController,
     private bookingService: BookingService, private loadingService : LoadingService) { }

  ngOnInit() {
    this.loadingService.simpleLoader()
    this.bookingService.getAllDriverSchedule().subscribe(async res =>{
       this.schedule = res
    })

    this.bookingService.getAllBookings().subscribe(res =>{
      this.bookings = res
      console.log(this.bookings)
    })
    
    this.userService.getUsers().subscribe(res =>{
      this.users = res
      console.log(this.users)
    })

    this.userService.getDateByID().subscribe(res =>{
      this.dates = res
      console.log(this.dates)
    })

    this.user = JSON.parse(localStorage.getItem('user'))
    this.userID = this.user['id']
    this.profileForm = this.fb.group({
      firstname: new FormControl('', [Validators.required, Validators.pattern('^.*[a-zA-Z].*$')]),
      lastname: new FormControl('', [Validators.required, Validators.pattern('^.*[a-zA-Z].*$')]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[1-9]+[0-9]*$'), Validators.maxLength(10), Validators.minLength(10)]),
      email: new FormControl('', [Validators.required,  Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      profile_Picture: new FormControl(''),
    })
    this.userService.getUserById(this.route.snapshot.params['id']).subscribe(res => {
      this.FetchData(res)
      this.loadingService.dismissLoader()
    })
  }
  
  FetchData(res){
    this.userProfile = res
    this.profileForm.setValue({
      firstname: this.userProfile['firstname'],
      lastname: this.userProfile['lastname'],
      phoneNumber: this.userProfile['phoneNumber'],
      email: this.userProfile['email'],
      profile_Picture: this.userProfile['profile_Picture']
    })
  }

  triggerUploadFile(fileInput: HTMLInputElement){
    fileInput.click()
  }
  uploadProfilePicture(event: any){
    var file = event.target.files
    if(file){
      if(file.length > 2){
        alert("Please select a single photo!")
      }
      else{
        var fileReader = new FileReader
        fileReader.readAsDataURL(file[0])
        fileReader.onload = (event: any) => {
          this.userService.ProfilePicture = event.target.result
          var details = JSON.parse(localStorage.getItem("userDetails"))
          details['profile_Picture'] = event.target.result
          localStorage.setItem("userDetails", JSON.stringify(details))
        }
        console.log(this.userService.ProfilePicture)
      }
    }
  }

  Save(){
    this.userProfile = {
      id: this.route.snapshot.params['id'],
      firstname : this.profileForm.value.firstname,
      lastname: this.profileForm.value.lastname,
      phoneNumber: this.profileForm.value.phoneNumber,
      email: this.profileForm.value.email,
      profile_Picture: this.userService.ProfilePicture
    }
    

    this.userService.Firstname = this.userProfile.firstname
    this.userService.Lastname = this.userProfile.lastname
    this.userService.email = this.userProfile.email
    this.userService.PhoneNumber = this.userProfile.phoneNumber

    var details = JSON.parse(localStorage.getItem("userDetails"))
    details["firstname"] = this.userProfile.firstname
    details["lastname"] = this.userProfile.lastname
    details["phoneNumber"] = this.userProfile.phoneNumber
    details["email"] = this.userProfile.email
    localStorage.setItem("userDetails", JSON.stringify(details))

    
    this.userService.saveUser(this.userProfile).subscribe(
    (res) => {
        console.log(res)
    },
    (err:HttpErrorResponse) => {
      if(err.status === 200){
        console.log("Success")
        this.router.navigateByUrl("/admin/user")
        this.editToast()
      }
    })
  }

  deactivate(){
   if(this.schedule.map(obj => obj.driverUserId.split('T')[0]).indexOf(this.userID) > -1 || this.schedule.map(obj => obj.driverUserId.split('T')[0]).indexOf(this.userID) > -1){

   }
    
   
   this.userService.deactivateUser(this.route.snapshot.params['id'], this.userProfile).subscribe(res =>{
      console.log(res)
    },
    (err:HttpErrorResponse) => {
      if(err.status === 200){
        this.router.navigate(['/admin/user']).then(() => {
          this.presentToast()
        })
      }
    })

   

  }

  async editAlert(){     
    
     alert = await this.alertController.create({
      header: 'Alert!',
      subHeader : 'User',
      message : 'Are you sure you want to edit the user details',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'CONFIRM',
          role: 'confirm',
          handler: () => {this.Save()}
        }
      ]
      
    });
    await alert.present();
  }

  async deactivateAlert(){
      var id = this.route.snapshot.params['id']
      var date = new Date
      var newDate = date.toISOString()
      console.log(this.dates)
        for(var i =0; i < this.dates.length; i++){
          if(this.schedule.map(obj => obj.driverUserId).indexOf(id) > -1 && this.dates[i].date.split('T')[0] >= newDate.split('T')[0]){
            alert = await this.alertController.create({
              header: 'Alert!',
              subHeader : 'Remove User',
              message : 'This Driver still has scheduled delivery.',
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel',
                  handler: () => {  }
                },
                {
                  text: 'Confirm',
                  role: 'confirm',
                  handler: () => { }
                }
              ]
            });
            // await alert.present();
          }
          else if(this.bookings.map(obj => obj.senderUserId).indexOf(id) > -1){
            alert = await this.alertController.create({
              header: 'Alert!',
              subHeader : 'Remove User',
              message : 'This User still has scheduled bookings.',
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel',
                  handler: () => {  }
                },
                {
                  text: 'Confirm',
                  role: 'confirm',
                  handler: () => { }
                }
              ]
            });
          }
          else{
            alert = await this.alertController.create({
              header: 'Alert!',
              subHeader : 'Remove User',
              message : 'Are you sure that you want to remove this User',
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel',
                  handler: () => {  }
                },
                {
                  text: 'OK',
                  role: 'confirm',
                  handler: () => { this.deactivate()}
                }
              ]
            });
            
          }
        }
        await alert.present();
      }

  async presentToast() {
    const toast = await this.toast.create({
      header: 'User',
      message: 'The user was deactivated successfully!',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }

  async editToast() {
    const toast = await this.toast.create({
      header: 'User',
      message: 'The user was updated successfully!',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }
}
