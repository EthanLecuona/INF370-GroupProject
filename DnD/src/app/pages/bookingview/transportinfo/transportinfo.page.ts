import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController, ViewWillEnter } from '@ionic/angular';
import { EventService } from 'src/app/services/management/event/event.service';
import { BookingService } from 'src/app/services/system/booking.service';
import { LoadingService } from 'src/app/services/system/loading.service';

@Component({
  selector: 'app-transportinfo',
  templateUrl: './transportinfo.page.html',
  styleUrls: ['./transportinfo.page.scss'],
})
export class TransportinfoPage implements ViewWillEnter, OnInit {

  eventForm : FormGroup
  eventId : number
  bookingId : number
  eventDate

  events : any[] = []
  constructor(
    private route : ActivatedRoute,
    private eventservice : EventService,
    private frmBuilder : FormBuilder,
    private alertController : AlertController,
    private bookingservice : BookingService,
    private routes : Router,
    private toast : ToastController,
    private loader : LoadingService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.eventForm = this.frmBuilder.group({
      Description: new FormControl(''),
      NumberOfEmployees: new FormControl(''),
      Location: new FormControl(''),
      EventDate : new FormControl('')
    })
  }

  ionViewWillEnter() {
    this.loader.simpleLoader()
    this.eventId = this.route.snapshot.params['eventId']
    this.eventDate = this.route.snapshot.params['Date']
    this.bookingId = this.route.snapshot.params['bookingId']

    this.eventservice.getEvent(this.eventId).subscribe(res => {
      this.events.push(res)
      console.log(this.events)
      this.eventForm.setValue({
        Description: this.events[0]['description'],
        NumberOfEmployees: this.events[0].numberOfEmployees,
        Location: this.events[0].location,
        EventDate : this.events[0].eventDate
      })
      this.loader.dismissLoader()
    })
  }

  async cancelTransportAlert(){
    const alert = await this.alertController.create({
      subHeader : 'Cancel Transport Booking',
      message : 'Are you sure you sure that you want to cancel the selected transportation booking?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {OpenModal()}
        }
      ] 
    });
    await alert.present();
  }

  cancelBooking(reason : string) {
    this.eventservice.deleteTransportBooking(this.bookingId).subscribe(res => {
      if(res == null) {
        var myModal = document.getElementById('cancel-modal')
        myModal.setAttribute('is-open','false')
        var date = new Date()
        this.bookingservice.addBookingCancellation(this.bookingId, date, reason).subscribe(res => {
          console.log(res)
          this.routes.navigateByUrl('bookingview').then(() => {
            this.presentToastCancel()
          })
        })
      } else {
        this.BookingCancelFail()
      } 
    })
  }

  async presentToastCancel() {
    const toast = await this.toast.create({
      header: 'Booking Cancelled Successfully',
      message: 'The Booking was Successfully cancelled',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }

  async BookingCancelFail() {
    const toast = await this.toast.create({
      header: 'Booking Cancellation Fail',
      message: 'Booking cancellation failed please try again!',
      position: 'top',
      animated: true,
      color: 'danger',
      duration: 3000,
    });
    toast.present();
  }

  back(){
    this.router.navigateByUrl("bookingview")
  }

}

function OpenModal() {
  console.log('open')
  var myModal = document.getElementById('cancel-modal')
  myModal.setAttribute('is-open', 'false')
  myModal.setAttribute('is-open','true')
}
