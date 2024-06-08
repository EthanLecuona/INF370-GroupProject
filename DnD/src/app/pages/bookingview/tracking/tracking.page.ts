/// <reference types="@types/google.maps" />
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { interval } from 'rxjs';
import { NotificationService } from 'src/app/services/system/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.page.html',
  styleUrls: ['./tracking.page.scss'],
})
export class TrackingPage implements ViewWillEnter {
  @ViewChild('map') mapElement: ElementRef
  
  bookingId : number
  location : {} = {}
  refresher

  constructor(
    private renderer : Renderer2,
    private route : ActivatedRoute,
    private notification : NotificationService
  ) { }

  ionViewWillLeave() {
    location.reload()
  }

  ionViewWillEnter(): void {
    this.notification.getDriverLoaction().subscribe(res => {
      this.location = res
      console.log(this.location)
    })
    this.refresher = interval(5000).subscribe(() => {
      this.notification.getDriverLoaction().subscribe(res => {
        this.location = res
        console.log(this.location)
      })
    })
    this.bookingId = this.route.snapshot.params['bookid']
    sleep(2000).then(() => {
      this.getGoogleMaps().then(googleMaps => {
        const mapElmnt = this.mapElement.nativeElement
        const map = new googleMaps.Map(mapElmnt, {
          center: this.location,
          zoom: 10
        })
        const marker = new googleMaps.Marker({ map, position: this.location });
        googleMaps.event.addListenerOnce(map, 'idle', () => {
          this.renderer.addClass(mapElmnt, 'visible')
        })
    
        }).catch(err => {
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

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve,ms))
}
