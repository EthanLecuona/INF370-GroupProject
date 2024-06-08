/// <reference types="@types/google.maps" />
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { DriverService } from 'src/app/services/driver/driver.service';
import { BookingService } from 'src/app/services/system/booking.service';
import { NotificationService } from 'src/app/services/system/notification.service';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';
// import { Geofence } from '@ionic-native/geofence';
import { interval } from 'rxjs';

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

@Component({
  selector: 'app-schedule-maps',
  templateUrl: './schedule-maps.page.html',
  styleUrls: ['./schedule-maps.page.scss'],
})
export class ScheduleMapsPage implements OnInit {
  @ViewChild('map') mapElement: ElementRef
  currentDate = new Date().toISOString()
  selectedDate = ''
  driverName = ''
  Locations = ''
  QRscanned = ''
  locationsCheck : any[] = []
  finalLocations : any[] = []
  images : string = ''
  amountParcelsEPI : number = 0
  amountParcelOther : number = 0
  userId  : {} = {}
  data = null
  InspectionForm : FormGroup
  selectedFiles? : FileList
  checkedTires : boolean = false
  refresher

  constructor(
    private renderer : Renderer2, 
    private route : ActivatedRoute, 
    private driverService : DriverService, 
    private bookingService : BookingService, 
    private barcodeScanner : BarcodeScanner,
    private notification : NotificationService,
    private toast : ToastController,
    private frmBuilder : FormBuilder,
    private geoLocation : Geolocation,
    private platfrm : Platform,
    private backgroundMode : BackgroundMode,
    // private geoFence : Geofence
    ) { }

  ngOnInit(): void {
    this.checkedTires = false
    this.InspectionForm = this.frmBuilder.group({
      preInspectionOdometer : new FormControl('',Validators.required),
      preInspectionNotes : new FormControl('',Validators.required)
    })
  }
  ionViewWillLeave() {
    location.reload()
    this.backgroundMode.disable()
  }
  ionViewWillEnter() {
    this.platfrm.ready().then(() => {
      this.backgroundMode.enable()
      this.backgroundMode.disableWebViewOptimizations()
      console.log('yes')
    })
    this.userId = JSON.parse(localStorage.getItem('user'))
    this.bookingService.getUserDetails(this.userId['id']).subscribe(res => {
      console.log(res)
      this.driverName += res['firstname'] + ' ' + res['lastname']
    })
    this.selectedDate = this.route.snapshot.params['id']
    this.driverService.getTrackingOnDate(this.selectedDate).subscribe(res => {
      this.locationsCheck = res
        this.locationsCheck.map(({endLocation, startLocation})=>{ 
          if(endLocation.match(/^46 Ingersol.*$/)) {
            this.finalLocations.push({location : startLocation})
            this.amountParcelOther++
          } else {
            this.finalLocations.push({location : endLocation})
            this.amountParcelsEPI++
          }
        })

    // this.geoFence.initialize().then(() => {
    //   console.log('Ready')
    // }, () => {
    //   console.log('Geofence Error')
    // })

    this.refresher = interval(5000).subscribe(() => {
      this.geoLocation.getCurrentPosition(options).then((resp) => {
        var lat = resp.coords.latitude
        var lng = resp.coords.longitude
        this.notification.updateDriverLocation(lat, lng).subscribe(res => {
          console.log(res)
        })
        console.log(resp)
        }).catch((error) => {
          console.log('Error getting location', error);
        });
    })
        
    this.getGoogleMaps().then(googleMaps => {
      const mapElmnt = this.mapElement.nativeElement
      const map = new googleMaps.Map(mapElmnt, {
        center: { lat: -25.756135, lng: 28.220334},
        zoom: 10
      })
      googleMaps.event.addListenerOnce(map, 'idle', () => {
        this.renderer.addClass(mapElmnt, 'visible')
      })

      const directionsService = new googleMaps.DirectionsService();
      const directionsRenderer = new googleMaps.DirectionsRenderer({
        draggable: false,
        map
      });

      this.displayRoute(
        "46 Ingersol Rd, Lynnwood Glen, Pretoria, 0081, South Africa",
        "46 Ingersol Rd, Lynnwood Glen, Pretoria, 0081, South Africa",
        directionsService,
        directionsRenderer,
        this.finalLocations
      );
      document.getElementById('Navigate').addEventListener('click', () => {
        this.Locations = ''
        for(var i = 0; i < this.finalLocations.length; i++) {
          this.Locations += this.finalLocations[i]['location'] + '/'
          this.notification.getLatLng(this.finalLocations[i]['location']).subscribe(res => {
            // let fence = {
            //   id: i, //any unique ID
            //   latitude: res['results'][0]['geometry']['location']['Lat'], //center of geofence radius
            //   longitude: res['results'][0]['geometry']['location']['Lng'],
            //   radius: 1000, //radius to edge of geofence in meters
            //   transitionType: 1, //see 'Transition Types' below
            // }
            // this.geoFence.addOrUpdate(fence).then(() => {
            //   console.log('Fence Added')
            // }, () => {
            //   console.log('Fence Error')
            // })
          })
        }
        this.notification.preInspection(this.images, this.checkedTires, this.InspectionForm, this.userId['id']).subscribe(res => {
          console.log(res)
          this.navigate()
          sleep(2000).then(() => {
            window.open('https://www.google.com/maps/dir/46 Ingersol Rd, Lynnwood Glen, Pretoria, 0081, South Africa/' + this.Locations + '46 Ingersol Rd, Lynnwood Glen, Pretoria, 0081, South Africa')
          })
        }, (err : HttpErrorResponse) => {
          if(err.status == 400) {
            this.navigateError()
          }
        })
        })
      })
      .catch(err => {
        alert('No maps')
      })
    })
  }


  private getGoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps)
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsKey}&libraries=places`
      script.async = true
      script.defer = true
      document.body.appendChild(script)
      script.onload = () => {
        const loadedGoogleModule = win.google
        if (loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps)          
        } else {
          reject('Google maps is offline :(')
        }
      }
    })
  }

  private displayRoute(
    origin: string,
    destination: string,
    service: google.maps.DirectionsService,
    display: google.maps.DirectionsRenderer,
    waypoints : any[]
  ) {
    service.route({
        origin: origin,
        destination: destination,
        waypoints: waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
        avoidTolls: false,
      })
      .then((result: google.maps.DirectionsResult) => {
        display.setDirections(result);
      })
      .catch((e) => {
        alert("Could not display directions due to: " + e);
      });
  }

  scanQR() {
    var id1 = ''
    var id2 = ''
    var bookingId = ''
    this.data = null;
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.data = barcodeData;
      if(this.data['text'].split(',')[0] != '') {
        bookingId = this.data['text'].split(',')[0]
        id1 = this.data['text'].split(',')[1]
        id2 = this.data['text'].split(',')[2]
        this.notification.updateBookingStatusDriver(bookingId).subscribe(res => {
          this.validQR()
          this.QRscanned += 'Parcel Booking: ' + bookingId
          this.notification.sendNotification(id1,id2,'Your parcel booking is picked up and in progress.')
        }, (err : HttpErrorResponse) => {
          if(err.status === 400) {
            this.invalidQR()
          }
        })
      }
      }).catch(err => {
        console.log('Error', err);
    });
  }

  async openGallery(e : any) {
    const selectedFiles = [...e.target.files].map(file => {
      if(file.type != 'image/jpeg') {
        alert('Does not support any other file format than Jpeg!')
      } else {
        const reader = new FileReader()
        return new Promise(resolve => {
          reader.onload = () => resolve(reader.result)
          reader.readAsDataURL(file)
        })
      }
    })
    const res = await Promise.all(selectedFiles)
    for(var i = 0; i < res.length; i++) {
      this.images += '@' + res[i]
    }
  }

  checkTires(event : any) {
    console.log(event)
    if(event['detail']['checked']){
      event.checked = true;
      this.checkedTires = true
      console.log(this.checkedTires)
    } else {
      event.checked = false
      this.checkedTires = false
      console.log(this.checkedTires)
    }
  }

  async navigate() {
    const toast = await this.toast.create({
      header: 'Pre-Trip Inspection Complete',
      message: 'Vehicle Pre-Trip Inspection complete, Have a safe trip!',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 3000,
    });
    toast.present();
  }

  async navigateError() {
    const toast = await this.toast.create({
      header: 'Pre-Trip Inspection Invalid',
      message: 'Vehicle Pre-Trip Inspection invalid, please check pre-trip inspection form!',
      position: 'top',
      animated: true,
      color: 'danger',
      duration: 3000,
    });
    toast.present();
  }

  async invalidQR() {
    const toast = await this.toast.create({
      header: 'QR Scan Invalid',
      message: 'The QR code is already scanned or the QR code is not for this delivery!',
      position: 'top',
      animated: true,
      color: 'danger',
      duration: 3000,
    });
    toast.present();
  }

  async validQR() {
    const toast = await this.toast.create({
      header: 'QR Scan Successful',
      message: 'The QR code was successfully scanned!',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 3000,
    });
    toast.present();
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve,ms))
}



