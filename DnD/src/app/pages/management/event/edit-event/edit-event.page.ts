import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { EventService } from 'src/app/services/management/event/event.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.page.html',
  styleUrls: ['./edit-event.page.scss'],
})
export class EditEventPage implements OnInit {
  editEventForm: FormGroup
  eventList: {}
  updatedEvent: {}
  currentDate = new Date().toISOString()
  newDate : string
  constructor(private frmBuilder : FormBuilder, private route : Router, private toast : ToastController, private eventrepo: EventService, private activeroute: ActivatedRoute) { }

  ngOnInit() {
    this.editEventForm = this.frmBuilder.group({
      description: new FormControl(''),
      numberOfEmployees: new FormControl(''),
      location: new FormControl(''),
      EventDate : new FormControl('')
    })
    this.onLoad()
  }

  onLoad(){
    this.eventrepo.getEvent(this.activeroute.snapshot.params['id']).subscribe(res =>{
      this.eventList = (res)
      console.log(this.eventList)
      this.newDate = this.eventList['eventDate']
      this.editEventForm.setValue({
        description : this.eventList['description'],
        numberOfEmployees : this.eventList['numberOfEmployees'],
        location : this.eventList['location'],
        EventDate : this.eventList['eventDate']
      })
    })
  }

  async updateEvent(){
    this.updatedEvent = {
      description : this.editEventForm.controls['description'].value,
      numberOfEmployees : this.editEventForm.controls['numberOfEmployees'].value,
      location : this.editEventForm.controls['location'].value,
      eventDate : this.editEventForm.controls['EventDate'].value
    }
    this.eventrepo.updateEvent(this.eventList['eventId'], this.updatedEvent).subscribe(res => {
      this.route.navigate(['management/event']).then(() => {
        this.presentToast()
      })
    }, (err : HttpErrorResponse) => {
      if(err.status === 400) {
        this.errorToast()
      }
    })
  }

  Cancel(){
    this.route.navigate(['management/event'])
  }

  async presentToast() {
    const toast = await this.toast.create({
      header: 'Event Updated',
      message: 'The event was updated successfully!',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }

  async errorToast() {
    const toast = await this.toast.create({
      header: 'Update Error',
      message: 'The event could not be updated at this time!',
      position: 'top',
      animated: true,
      color: 'danger',
      duration: 2000,
    });
    toast.present();
  }
}
