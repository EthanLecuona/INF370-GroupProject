import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyServiceService } from 'src/app/services/admin/company/company.service';
import { EventService } from 'src/app/services/management/event/event.service';
import { BookingService } from 'src/app/services/system/booking.service';
import { LoadingService } from 'src/app/services/system/loading.service';


@Component({
  selector: 'app-bookingview',
  templateUrl: './bookingview.page.html',
  styleUrls: ['./bookingview.page.scss'],
})
export class BookingviewPage implements OnInit {

  activateTab: string = 'placed'
  type: string = "placed"
  user : {}
  userCec : any[] = []
  userBookings : any[] = []
  bookingDetails : any[] = []
  clientBookings : any[] = []
  inProgressBookings : any[] = []
  activeBookings : any[] = []
  completedBookings : any[] = []
  canceledBookings : any[] = []
  transportBookings : any[] = []
  searchTerm : string
  
  constructor(
    private router: Router, 
    private bookingservice : BookingService, 
    private loader: LoadingService,
    private eventService : EventService
    ) { }

  ngOnInit() {
    
  }
  async ionViewWillEnter() {
    this.activeBookings = []
    this.completedBookings = []
    this.inProgressBookings = []
    this.transportBookings = []
    this.loader.simpleLoader()
    var currentDate = new Date().toISOString()
    this.bookingservice.getBookingDetails().subscribe(res => {
      this.getBookingDetails(res)
    })
    this.user = JSON.parse(localStorage.getItem('user'))
    if(this.user['role'] === 'client') {
      this.bookingservice.getClientEmployee(this.user['id']).subscribe(res => {
        console.log(res)
        this.userCec.push(res)
          this.bookingservice.getBookings(this.userCec[0][0]['cecId']).subscribe((res : []) => {
            console.log(res)
            this.userBookings.push(res)
            for(var i = 0 ; i < res.length; i++) {
              if(res[i]['status']['status'] == 'Placed' && res[i]['canceled'] == false) {
                this.activeBookings.push(res[i])
              } else if(res[i]['status']['status'] == 'Completed' && res[i]['canceled'] == false) {
                this.completedBookings.push(res[i])
              } else if (res[i]['canceled'] == true) {
                this.canceledBookings.push(res[i])
              } else if (res[i]['status']['status'] == 'In Progress') {
                this.inProgressBookings.push(res[i])
              }
            }
            this.loader.dismissLoader()
          })
      })
    } else {
      this.bookingservice.getEmployeeClient(this.user['id']).subscribe((res) => {
        this.userCec.push(res)
        for(var i = 0; i < this.userCec[0].length; i++) {
          this.bookingservice.getBookings(this.userCec[0][i]['cecId']).subscribe((res : []) => {
            for(var i = 0 ; i < res.length; i++) {
                if(res[i]['status']['status'] == 'Placed' && res[i]['canceled'] == false) {
                  this.activeBookings.push(res[i])
                } else if(res[i]['status']['status'] == 'Completed' && res[i]['canceled'] == false) {
                  this.completedBookings.push(res[i])
                } else if (res[i]['canceled'] == true) {
                  this.canceledBookings.push(res[i])
                } else if (res[i]['status']['status'] == 'In Progress') {
                  this.inProgressBookings.push(res[i])
                }
              }
          })
        }
        this.loader.dismissLoader()
      })
      this.eventService.getTransportBookings(this.user['id']).subscribe((res : []) => {
        for(var i = 0; i < res.length; i++) {
          if(res[i]['status']['status'] == 'Placed' && res[i]['canceled'] == false) {
            this.transportBookings.push(res[i])
          }
        }
      })
      
    }

  }

  tabChange(e){
    this.activateTab = e.target.value;
  }

  getBookingDetails(res) {
    this.bookingDetails.push(res)
  }

}

function getAllIndexes(arr, val) {
  var indexes = [], i;
  for(i = 0; i < arr.length; i++)
      if (arr[i] === val)
          indexes.push(i);
  return indexes;
}