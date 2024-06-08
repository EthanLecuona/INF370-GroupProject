import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/management/event/event.service';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.page.html',
  styleUrls: ['./view-event.page.scss'],
})
export class ViewEventPage implements OnInit {
  viewEventForm: FormGroup;
  eventList: {}
  currentDate = new Date().toISOString()
  newDate : string
  constructor(private frmBuilder : FormBuilder, private eventRepos: EventService, private route : Router, private activeroute: ActivatedRoute) { }

  ngOnInit() {
    this.viewEventForm = this.frmBuilder.group({
      eventId: new FormControl(''),
      description: new FormControl(''),
      numberOfEmployees: new FormControl(''),
      location: new FormControl(''),
      EventDate : new FormControl('')
    })
    this.onLoad()
  }

  onLoad(){
    this.eventRepos.getEvent(this.activeroute.snapshot.params['id']).subscribe(res =>{
      this.eventList = (res)
      console.log(this.eventList)
      this.newDate = this.eventList['eventDate']
      this.viewEventForm.setValue({
        eventId : this.eventList['eventId'],
        description : this.eventList['description'],
        numberOfEmployees : this.eventList['numberOfEmployees'],
        location : this.eventList['location'],
        EventDate : this.eventList['eventDate']
      })
    })
  }

  Cancel(){
    this.route.navigateByUrl('management/event')
  }

}
