import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { EventService } from 'src/app/services/management/event/event.service';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.page.html',
  styleUrls: ['./delete-event.page.scss'],
})
export class DeleteEventPage implements OnInit {
  deleteEventForm: FormGroup
  eventList: {}
  currentDate = new Date().toISOString()
  newDate : string
  constructor(private frmBuilder : FormBuilder, private route : Router, private alertController: AlertController, private toast : ToastController, private eventrepo: EventService, private activeroute: ActivatedRoute) { }

  ngOnInit() {
    this.onLoad()

    this.deleteEventForm = this.frmBuilder.group({
      description: new FormControl(''),
      numberOfEmployees: new FormControl(''),
      location: new FormControl(''),
      EventDate : new FormControl('')
    })
  }

  onLoad(){
    this.eventrepo.getEvent(this.activeroute.snapshot.params['id']).subscribe(res =>{
      this.eventList = (res)
      console.log(this.eventList)
      this.newDate = this.eventList['eventDate']
      this.deleteEventForm.setValue({
        description : this.eventList['description'],
        numberOfEmployees : this.eventList['numberOfEmployees'],
        location : this.eventList['location'],
        EventDate : this.eventList['eventDate']
      })
    })
  }

  Cancel(){
    this.route.navigate(['management/event'])
  }

  async deleteEvent(){
    for(var i = 0; i < 1; i++){
      const alert = await this.alertController.create({
        header: 'Alert!',
        subHeader : 'Delete Event',
        message : 'Are you sure you want to delete this event?',
        buttons: [
          {
            text: 'CANCEL',
            role: 'cancel',
            handler: () => {  }
          },
          {
            text: 'CONFIRM',
            role: 'confirm',
            handler: () => {this.deactivate()}
          }
        ]
        
      });
      await alert.present();
    }
  }

  async deleteEventError(){
    for(var i = 0; i < 1; i++){
      const alert = await this.alertController.create({
        header: 'Cannot Delete Event',
        message : 'The event you are trying to delete has active bookings attached, Cannot delete.',
        buttons: [
          {
            text: 'CONFIRM',
            role: 'confirm',
            handler: () => {}
          }
        ]
        
      });
      await alert.present();
    }
  }

  deactivate(){
    this.eventrepo.checkDeleteEvent(this.activeroute.snapshot.params['id']).subscribe(res => {
      console.log(res)
    }, (err : HttpErrorResponse) => {
      if(err.status === 200) {
        this.eventrepo.deleteEvent(this.eventList['eventId']).subscribe(res => {
          this.route.navigate(['management/event']).then(() => {
            this.deleteSuccessToast()
          }) 
        }, (err: HttpErrorResponse) => {
          if(err.status === 400) {
            this.deleteFailToast()
          }
        })
      } else if (err.status === 400) {
        this.deleteEventError()
      }
    })
  }

  async deleteSuccessToast() {
    const toast = await this.toast.create({
      header: 'Event Deleted',
      message: 'The event was successfully removed',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }

  async deleteFailToast() {
    const toast = await this.toast.create({
      header: 'Error Deleting Event',
      message: 'The event could not be deleted',
      position: 'top',
      animated: true,
      color: 'danger',
      duration: 2000,
    });
    toast.present();
  }

}
