import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IonList, ToastController, ViewWillEnter } from '@ionic/angular';
import { EventService } from 'src/app/services/management/event/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements ViewWillEnter {
  eventInfo : [] = []
  searchTerm : string

  constructor(private eventRepos: EventService, private route : Router) { }

  ionViewWillEnter(): void {
    this.eventInfo = []
    this.loadData()
  }

  loadData(){
    this.eventRepos.getAllEvents().subscribe(res =>{
      this.eventInfo = res
      console.log(this.eventInfo)
    })
  }

  addEvent(){
    this.route.navigateByUrl('management/event/add-event')
  }

  editEvent(){
    this.route.navigateByUrl('management/event/edit-event')
  }

  deleteEvent(){
    this.route.navigateByUrl('management/event/delete-event')
  }

  viewEvent(){
    this.route.navigateByUrl('event/view-event/event_ID')
  }
}
