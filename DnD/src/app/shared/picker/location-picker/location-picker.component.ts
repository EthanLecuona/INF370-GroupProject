import { HttpClient } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PlaceLoc } from '../../interfaces/location';
import { MapModalComponent } from '../map-modal/map-modal.component';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {
  @Output() locationPick = new EventEmitter<PlaceLoc>()
  selectedLocationImage : string
  isLoading : boolean = false

  constructor(private modlCntrl : ModalController, private http: HttpClient) { }

  ngOnInit() {}

  onPickLocation() {
    this.modlCntrl.create({component: MapModalComponent}).then(modalEl => {
      modalEl.onDidDismiss().then(result => {
        if(!result.data) {
          return
        }
        const pickedLocation : PlaceLoc = {
          lat: result.data.lat,
          lng: result.data.lng,
          address: null,
          staticMap: null
        }
        this.isLoading = true
        this.getAddress(result.data.lat, result.data.lng).pipe(switchMap((address) => {
          pickedLocation.address = address
          console.log(pickedLocation.address)
          return of(this.getMapImage(pickedLocation.lat,pickedLocation.lng, 14))
        })).subscribe(staticImage => {
          pickedLocation.staticMap = staticImage
          this.selectedLocationImage = staticImage 
          this.isLoading = false
          this.locationPick.emit(pickedLocation)
        })
      })
      modalEl.present();
    })
  }

  private getAddress(lat: number, lng: number) {
    return this.http.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.googleMapsKey}`)
    .pipe(map(geoData => {
      if(!geoData || !geoData.results || geoData.results.length === 0) {
        return null
      }
      return geoData.results[0].formatted_address
    }))
  }

  private getMapImage(lat: number, lng: number, zoom: number) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=600x300&maptype=roadmap
    &markers=color:red%7Clabel:Place%7C${lat},${lng}
    &key=${environment.googleMapsKey}`
  } 
}
