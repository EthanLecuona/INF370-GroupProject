import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { EventService } from 'src/app/services/management/event/event.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {
  addEventForm: FormGroup
  eventList: any[]=[]
  newEvent: {}
  currentDate = new Date().toISOString()
  constructor(private frmBuilder : FormBuilder, private route : Router, private toast : ToastController, private eventrepo: EventService) { }

  ngOnInit() {
    this.loadData()
    this.addEventForm = this.frmBuilder.group({
      Description: new FormControl('', [Validators.required]),
      NumberOfEmployees: new FormControl('', [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]),
      Location: new FormControl('', [Validators.required]),
      EventDate : new FormControl('', [Validators.required])
    })
  }

  async loadData(){
    await this.eventrepo.getAllEvents().subscribe(res=>{
      this.eventList = res
    })
  }

  async addEvent(){
    this.newEvent = {
      Description : this.addEventForm.controls['Description'].value,
      NumberOfEmployees : this.addEventForm.controls['NumberOfEmployees'].value,
      Location : this.addEventForm.controls['Location'].value, 
      EventDate : this.addEventForm.controls['EventDate'].value
    }
    console.log(this.newEvent)
    this.eventrepo.addEvent(this.newEvent).subscribe(res => {
      this.route.navigate(['management/event']).then(() => {
        this.presentToast()
      })
    }, (err : HttpErrorResponse) => {
      if (err.status === 400) {
        alert('There was an error adding the event!')
      } 
    })
  }

  async presentToast() {
    const toast = await this.toast.create({
      header: 'Event',
      message: 'The event was added successfully!',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }

  Cancel(){
    this.route.navigate(['management/event'])
  }

}
