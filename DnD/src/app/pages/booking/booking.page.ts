import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingService } from 'src/app/services/system/booking.service';
import { OverlayEventDetail } from '@ionic/core';
import { AlertController, IonModal, ToastController, ViewWillEnter } from '@ionic/angular';
import { CompanyServiceService } from 'src/app/services/admin/company/company.service';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from 'ngx-qrcode2';
import { jsPDF } from 'jspdf';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { PlaceLoc } from 'src/app/shared/interfaces/location';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/services/system/loading.service';
import { EventService } from 'src/app/services/management/event/event.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {
  @ViewChild(IonModal) modal : IonModal;

  activateTab: string = 'parcel'
  type: string = "parcel"
  location1 : string = ''

  bookingForm : FormGroup
  eventForm : FormGroup
  currentDate = new Date().toISOString()
  eventIndex : any 
  addedParcel : boolean = false
  ownLocation : boolean = false
  addEvent : boolean = false
  selectedEvent : boolean = false
  confidentIds : any[] = []
  priorityIds : any[] = []
  typeIds : any[] = []
  allParcels : any[] = []
  companyList : any[] = []
  clientInformation : any[] = []
  clientNames : any[] = []
  EmployeeClients : any[] = []
  events : any[] = []

  bookingInfo : {} = {}
  parcel : {} = {}
  userId  : {} = {}
  ClientEmployee : {} = {}
  customLocation : {} = {}
  trackingDetails : {} = {}

  elementType = null
  correctionLevel = null 
  value = null 
  myQR = null 

  scheduleBooking : {}
  scheduleTime : {}
  scheduleDate : {}
  ScheduleBooking : {}
  randomVehicle : {}
  randomDriver : {}
  
  constructor(
    private frmBuilder : FormBuilder, 
    private bookingservice : BookingService, 
    private companyService : CompanyServiceService, 
    private toast : ToastController, 
    private alertController: AlertController, 
    private routes: Router,
    private loader : LoadingService,
    private eventservice : EventService
    ) { }

  ngOnInit() {

    this.userId = JSON.parse(localStorage.getItem('user'))
    if (this.userId['role'] == 'client') { 
      this.bookingservice.getClientEmployee(this.userId['id']).subscribe(res => {
        this.EmployeeClients.push(res)
        console.log(this.EmployeeClients)
          this.bookingservice.getEmployeeClientCompanies(this.EmployeeClients[0][0]['userId']).subscribe(res => {
            this.clientInformation.push(res)
            console.log(this.clientInformation[0])
            if(this.clientInformation[0].map(obj => obj.clientID).indexOf(this.userId['id']) != -1) {
              var index = this.clientInformation[0].map(obj => obj.clientID).indexOf(this.userId['id'])
              this.companyService.getCompany(this.clientInformation[0][index]['companyID']).subscribe(res => {
                this.companyList.push(res)
                console.log(this.companyList)
              })
            }
          })
      })
    } else {
      this.bookingservice.getEmployeeClient(this.userId['id']).subscribe(res => {
        this.EmployeeClients.push(res)
          this.bookingservice.getClientNameCompanyName(this.userId['id']).subscribe(res => {
            this.companyList.push(res)
          })
      })
    }

    this.eventservice.getAllEvents().subscribe((res : any[]) => {
      for(var i = 0; i < res.length; i++) {
        if(res[i]['eventDate'] > this.currentDate) {
          this.events.push(res[i])
        }
      }
    })
    this.bookingservice.getAllConfidentId().subscribe(res => {
      this.confidentIds.push(res)
    })
    this.bookingservice.getAllPriorityId().subscribe(res => {
      this.priorityIds.push(res)
    })
    this.bookingservice.getAllTypeId().subscribe(res => {
      this.typeIds.push(res)
    })

    this.eventForm = this.frmBuilder.group({
      Description: new FormControl('', [Validators.required]),
      NumberOfEmployees: new FormControl('', [Validators.required]),
      Location: new FormControl('', [Validators.required]),
      EventDate : new FormControl('', [Validators.required])
    })

    if(this.userId['role'] == 'client') {
      this.bookingForm = this.frmBuilder.group({
        Confident : new FormControl('', Validators.required),
        Priority : new FormControl('', Validators.required),
        Type : new FormControl('', Validators.required),
        BookingDate : new FormControl('', Validators.required),
        startLocation : new FormControl('', Validators.required),
        endLocation : new FormControl({value : 'epi-use', disabled : true}, Validators.required),
        myQR : new FormControl('')
      })
    } else {
      this.bookingForm = this.frmBuilder.group({
        Confident : new FormControl('', Validators.required),
        Priority : new FormControl('', Validators.required),
        Type : new FormControl('', Validators.required),
        BookingDate : new FormControl('', Validators.required),
        startLocation : new FormControl({value : 'epi-use', disabled : true}, Validators.required),
        endLocation : new FormControl('', Validators.required),
        myQR : new FormControl('')
      })
    }
  }

  async generateBooking() {
    this.loader.simpleLoader()
    if(this.userId['role'] == 'client') {
      var compId = this.companyList[this.bookingForm.controls['startLocation'].value]['companyId']
      var clientId = this.EmployeeClients[0][this.bookingForm.controls['startLocation'].value]['clientUserId']
      var index = this.EmployeeClients[0].map(obj => obj.clientUserId).indexOf(clientId)
    } else {
      var compId = this.companyList[0][this.bookingForm.controls['endLocation'].value]['companyId']
      var clientID = this.companyList[0][this.bookingForm.controls['endLocation'].value]['userId']
      var index = this.EmployeeClients[0].map(obj => obj.clientUserId).indexOf(clientID)
    }
    await this.getGoogleMaps()
    this.value = 'QR CODE'
    sleep(2000).then(() => {
      var myne = document.getElementById('parent')
      this.myQR = myne.children[0].children[0]['currentSrc']
      console.log(this.myQR)

      if(this.ownLocation == true) {
        console.log(this.EmployeeClients)
        //Own Location Based of location picker
        this.bookingInfo = {
          qrcode : this.myQR,
          parcelConId : JSON.parse(this.bookingForm.controls['Confident'].value),
          parcelPriorityId : JSON.parse(this.bookingForm.controls['Priority'].value),
          parcelTypeId : JSON.parse(this.bookingForm.controls['Type'].value),
          date : this.bookingForm.controls['BookingDate'].value.split('T')[0],
          time : this.bookingForm.controls['BookingDate'].value.split('T')[1],
          cecId :  this.EmployeeClients[0][index]['cecId'],
          senderId : this.userId['id'],
          Distance : this.trackingDetails['Distance'],
          StartLocation : this.trackingDetails['StartLocation'],
          EndLocation : this.trackingDetails['EndLocation']
        }
        this.bookingservice.createBooking(this.bookingInfo).subscribe(res => {
          console.log(res)
        },(err : HttpErrorResponse) => {
          if(err.status === 400) {
            alert('Please make sure all booking info is filled in.')
          }
          if(err.status === 200) {
            this.loader.dismissLoader()
            this.presentToast().then(() => {
              sleep(1000).then(() => {
                location.reload()
              })
            })
          }
        })
      } else {
        //If role is not Client and Own Location is false
        if(this.userId['role'] != 'client') {
          console.log('here')
          this.bookingservice.getDirectionsFromEPI(this.location1).subscribe(res => {
            console.log(res)
            this.trackingDetails = {
              Distance: res['routes'][0]['legs'][0]['distance']['value'],
              StartLocation: res['routes'][0]['legs'][0]['start_address'],
              EndLocation: res['routes'][0]['legs'][0]['end_address']
            }
            this.bookingInfo = {
              qrcode : this.myQR,
              parcelConId : JSON.parse(this.bookingForm.controls['Confident'].value),
              parcelPriorityId : JSON.parse(this.bookingForm.controls['Priority'].value),
              parcelTypeId : JSON.parse(this.bookingForm.controls['Type'].value),
              date : this.bookingForm.controls['BookingDate'].value.split('T')[0],
              time : this.bookingForm.controls['BookingDate'].value.split('T')[1],
              cecId :  this.EmployeeClients[0][index]['cecId'],
              senderId : this.userId['id'],
              Distance : this.trackingDetails['Distance'],
              StartLocation : this.trackingDetails['StartLocation'],
              EndLocation : this.trackingDetails['EndLocation']
            }
            console.log(this.bookingInfo)
            this.bookingservice.createBooking(this.bookingInfo).subscribe(res => {
              console.log(res)
            },(err : HttpErrorResponse) => {
              if(err.status === 400) {
                alert('Please make sure all booking info is filled in.')
              }
              if(err.status === 200) {
                this.loader.dismissLoader()
                this.presentToast().then(() => {
                  sleep(1000).then(() => {
                    location.reload()
                  })
                })
              }
            })
          })
        } else {
          //if role is client and Own loaction false
          this.bookingservice.getDirectionsToEPI(this.location1).subscribe(res => {
            this.trackingDetails = {
              Distance: res['routes'][0]['legs'][0]['distance']['value'],
              StartLocation: res['routes'][0]['legs'][0]['start_address'],
              EndLocation: res['routes'][0]['legs'][0]['end_address']
            }
            console.log(this.bookingForm.controls['BookingDate'].value)
            this.bookingInfo = {
              qrcode : '1',
              parcelConId : JSON.parse(this.bookingForm.controls['Confident'].value),
              parcelPriorityId : JSON.parse(this.bookingForm.controls['Priority'].value),
              parcelTypeId : JSON.parse(this.bookingForm.controls['Type'].value),
              date : this.bookingForm.controls['BookingDate'].value.split('T')[0],
              time : this.bookingForm.controls['BookingDate'].value.split('T')[1],
              cecId :  this.EmployeeClients[0][index]['cecId'],
              senderId : this.userId['id'],
              Distance : this.trackingDetails['Distance'],
              StartLocation : this.trackingDetails['StartLocation'],
              EndLocation : this.trackingDetails['EndLocation']
            }
            console.log(this.bookingInfo)
            this.bookingservice.createBooking(this.bookingInfo).subscribe(res => {
              console.log(res)
            },(err : HttpErrorResponse) => {
              if(err.status === 400) {
                alert('Please make sure all booking info is filled in.')
              }
              if(err.status === 200) {
                this.loader.dismissLoader()
                this.presentToast().then(() => {
                  sleep(1000).then(() => {
                    location.reload()
                  })
                })
              }
            })
          })
        }
      }
    })
  }

  async getGoogleMaps() {
    if(this.userId['role'] == 'client') {
      var compId = this.companyList[this.bookingForm.controls['startLocation'].value]['companyId']
      var clientId = this.EmployeeClients[0][this.bookingForm.controls['startLocation'].value]['clientUserId']
      var index = this.EmployeeClients[0].map(obj => obj.clientUserId).indexOf(clientId)
    } else {
      var compId = this.companyList[0][this.bookingForm.controls['endLocation'].value]['companyId']
      var clientID = this.companyList[0][this.bookingForm.controls['endLocation'].value]['userId']
      var index = this.EmployeeClients[0].map(obj => obj.clientUserId).indexOf(clientID)
    } 
    if(this.ownLocation == true) {
      this.elementType = NgxQrcodeElementTypes.IMG
      this.correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH
      this.value = 'https://www.google.com/maps/dir//' + this.customLocation['address']
    } else {
      this.companyService.getCompany(compId).subscribe(res => {
        this.companyService.getAddress(res['addressId']).subscribe(res => {
          this.companyService.getStreet(res['streetId']).subscribe(res => {
            this.location1 += res['streetNumber'] + ', ' + res['streetName']
            this.companyService.getSuburb(res['suburbId']).subscribe(res => {
              this.location1 += ', ' + res['suburb1']
              this.elementType = NgxQrcodeElementTypes.IMG
              this.correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH
              this.value = 'https://www.google.com/maps/dir//' + this.location1
            })
          })
        })
      })
    }
  }

  onLocationPicked(location : PlaceLoc) {
    this.customLocation = location
    console.log(this.customLocation)
    if(this.userId['role'] != 'client') {
      this.bookingservice.getDirectionsFromEPI(this.customLocation['address']).subscribe(res => {
        this.trackingDetails = {
          Distance: res['routes'][0]['legs'][0]['distance']['value'],
          StartLocation: res['routes'][0]['legs'][0]['start_address'],
          EndLocation: res['routes'][0]['legs'][0]['end_address']
        }
      })
    } else {
      this.bookingservice.getDirectionsToEPI(this.customLocation['address']).subscribe(res => {
        this.trackingDetails = {
          Distance: res['routes'][0]['legs'][0]['distance']['value'],
          StartLocation: res['routes'][0]['legs'][0]['start_address'],
          EndLocation: res['routes'][0]['legs'][0]['end_address']
        }
      })
    }
  }

  checkLocation(event) {
    if(event['detail']['checked']){
      this.customLocation = {}
      event.checked = true;
      this.ownLocation = true
    } else {
      this.customLocation = {}
      event.checked = false
      this.ownLocation = false
    }
  }

  tabChange(e){
    this.activateTab = e.target.value;
  }

  async presentToast() {
    const toast = await this.toast.create({
      header: 'Booking Success',
      message: 'Booking Successfully Created!',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }

  async parcelAddedToast() {
    const toast = await this.toast.create({
      message: 'The parcel has been successfully added',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }

  async addBookingAlert(){
    const alert = await this.alertController.create({
      subHeader : 'Confirm Booking Details',
      message : 'Are you sure you sure that all of the booking details are correct?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {this.generateBooking()}
        }
      ] 
    });
    await alert.present();
  }

  eventSelect(e) {
    if(e.detail.value == 'add') {
      this.selectedEvent = false
      this.addEvent = true
      this.eventForm.reset()
    } else {
      this.eventIndex = e.detail.value
      this.selectedEvent = true
      this.addEvent = false
      this.eventForm.setValue({
        Description: this.events[this.eventIndex].description,
        NumberOfEmployees: this.events[this.eventIndex].numberOfEmployees,
        Location: this.events[this.eventIndex].location,
        EventDate : this.events[this.eventIndex].eventDate
      })
    }
  }

  makeBookingWithNewEvent() {
    var newEvent = {
      Description : this.eventForm.controls['Description'].value,
      NumberOfEmployees : this.eventForm.controls['NumberOfEmployees'].value,
      Location : this.eventForm.controls['Location'].value, 
      EventDate : this.eventForm.controls['EventDate'].value
    }
    console.log(newEvent)
    this.eventservice.addEvent(newEvent).subscribe(res => {
      this.bookingservice.getDirectionsFromEPI(this.eventForm.controls['Location'].value + ',Pretoria').subscribe(res => {
        console.log(res)
        var data = {
          distance : res['routes'][0]['legs'][0]['distance']['value'],
          startLocation : res['routes'][0]['legs'][0]['start_address'],
          endLocation : res['routes'][0]['legs'][0]['end_address'],
          date : this.eventForm.controls['EventDate'].value.split('T')[0],
          time : this.eventForm.controls['EventDate'].value.split('T')[1],
          senderId : this.userId['id']
        }
        console.log(data)
        this.eventservice.addNewTransportEvent(data).subscribe(res => {
          console.log(res)
          this.presentToast()
        }, (err : HttpErrorResponse) => {
          if(err.status === 400) {
            this.transportBookingFail()
          }
        })
      })
    }, (err : HttpErrorResponse) => {
      if(err.status === 400) {
        this.transportBookingFail()
      }
    })
  }

  makeBookingWithExistingEvent() {
    var eventID = this.events[this.eventIndex]['eventId']
    console.log('Only booking and existing event')
    console.log(this.eventForm.controls['Location'].value)
    this.bookingservice.getDirectionsFromEPI(this.eventForm.controls['Location'].value + 'Pretoria').subscribe(res => {
      console.log(res)
      var data = {
        distance : res['routes'][0]['legs'][0]['distance']['value'],
        startLocation : res['routes'][0]['legs'][0]['start_address'],
        endLocation : res['routes'][0]['legs'][0]['end_address'],
        date : this.eventForm.controls['EventDate'].value.split('T')[0],
        time : this.eventForm.controls['EventDate'].value.split('T')[1],
        senderId : this.userId['id']
      }
      console.log(data)
      this.eventservice.addExistingTransportEvent(data,eventID).subscribe(res => {
        console.log(res)
        this.presentToast()
      }, (err : HttpErrorResponse) => {
        if(err.status === 400) {
          this.transportBookingFail()
        }
      })
    }, (err : HttpErrorResponse) => {
      if(err.status === 400) {
        this.transportBookingFail()
      }
    })
  }

  async addTransportAlert(){
    const alert = await this.alertController.create({
      subHeader : 'Confirm Transport Booking Details',
      message : 'Are you sure you sure that all of the booking details for the transportation is correct?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => { if(this.addEvent == true) {
            this.makeBookingWithNewEvent()
          } else {
            this.makeBookingWithExistingEvent()
          }
        }
        }
      ] 
    });
    await alert.present();
  }

  async transportBookingFail() {
    const toast = await this.toast.create({
      header: 'The transport booking could not be made, Please try again later.',
      position: 'top',
      animated: true,
      color: 'danger',
      duration: 3000,
    });
    toast.present();
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve,ms))
}

