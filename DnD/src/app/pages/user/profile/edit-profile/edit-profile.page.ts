import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertController, ToastController } from '@ionic/angular';
import { LoadingService } from 'src/app/services/system/loading.service';
import { BookingService } from 'src/app/services/system/booking.service';
import { LoginService } from 'src/app/services/system/login.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  userProfile
  profileForm: FormGroup
  user: any
  userID: string
  schedule: any[] = []
  dates : any[] =[]
  bookings : any[] =[]

  constructor(private fb: FormBuilder,
      private router: Router,
      private route : ActivatedRoute,
      public userService: UserService,
      private alertController: AlertController,
      private loadingService : LoadingService,
      private toast : ToastController,
      private bookingService: BookingService,
      private loginService : LoginService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.userID = this.user['id']
    this.profileForm = this.fb.group({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      profile_Picture: new FormControl(''),
    })

    this.loadingService.simpleLoader()
    this.userService.getUser().subscribe(res => {
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

    this.bookingService.getAllDriverSchedule().subscribe(async res =>{
      this.schedule = res
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
    this.loadingService.simpleLoader()
    this.userProfile = {
      id: this.userID,
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
        this.loadingService.dismissLoader()
        console.log("Success")
        this.router.navigateByUrl("/user/profile").then(()=>{
         this.presentToast()
        })
      }
    })
  }
  Cancel(){
    this.router.navigateByUrl("user/profile")
  }
  async presentAlert(){
    const confirmReset = await this.alertController.create({
      header: 'Confirm to update details.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {
            this.Save()
          }
        }
      ]
    })
    await confirmReset.present()
  }

  async presentToast() {
    const toast = await this.toast.create({
      message: 'Profile updated successfully.',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }

  deactivate(){
    if(this.schedule.map(obj => obj.driverUserId.split('T')[0]).indexOf(this.userID) > -1 || this.schedule.map(obj => obj.driverUserId.split('T')[0]).indexOf(this.userID) > -1){
 
    }
     
    
    this.userService.deactivateUser(this.userID, this.userProfile).subscribe(res =>{
       console.log(1)
     },
     (err:HttpErrorResponse) => {
       if(err.status === 200){
         this.router.navigate(['/user/profile']).then(() => {
           this.Toast()
         })
         this.logout()
       }
       if(err.status === 400){
       alert('Could not deactivate profile')
      }
     })
   }

   logout(){
    this.loginService.logout().subscribe(
      (res) => {
        console.log(res)
      },
      (err: HttpErrorResponse) => {
        if(err.status === 200){
          this.userService.refresh()
          this.router.navigateByUrl("home/login").then(() => {
            this.LogoutSuccess().then(() => {
              location.reload()
            })
          })
        }
      })
    }

    async LogoutSuccess() {
      const toast = await this.toast.create({
        message: 'Successfully Logged Out',
        position: 'top',
        animated: true,
        color: 'success',
        duration: 3000,
      });
      toast.present();
    }
  
    async deactivateAlert(){
    let alert
    var id = this.route.snapshot.params['id']
    var date = new Date
    var newDate = date.toISOString()
    console.log(this.dates)
  
       
        if(this.bookings.map(obj => obj.senderUserId).indexOf(id) > -1){
          alert = await this.alertController.create({
            header: 'Alert!',
            subHeader : 'Deactivate Profile',
            message : 'You still have scheduled bookings, please cancel them before deactivating.',
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
          await alert.present();
        }
        else{
          alert = await this.alertController.create({
            header: 'Alert!',
            subHeader : 'Deactivate Profile',
            message : 'Are you sure that you want to deactivate your profile',
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
          await alert.present();
        }
      }
     
      async Toast() {
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
    
}
