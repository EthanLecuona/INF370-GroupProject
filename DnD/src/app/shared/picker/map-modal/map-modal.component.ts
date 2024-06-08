import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit, AfterViewInit {
@ViewChild('map') mapElement: ElementRef

  constructor(private modalCntrl : ModalController, private renderer : Renderer2) { }

  ngOnInit() {}

  
  ngAfterViewInit() {
    this.getGoogleMaps().then(googleMaps => {
      
      const mapElmnt = this.mapElement.nativeElement
      const map = new googleMaps.Map(mapElmnt, {
        center: { lat: -25.756135, lng: 28.220334},
        zoom: 10
      })
      googleMaps.event.addListenerOnce(map, 'idle', () => {
        this.renderer.addClass(mapElmnt, 'visible')
      })
      
      map.addListener('click', event => {
        const selectedCoords = {
          lat: event.latLng.lat(), 
          lng: event.latLng.lng() 
        }
        this.modalCntrl.dismiss(selectedCoords)
      })

      var searchBox = new googleMaps.places.SearchBox(document.getElementById('pac-input'));
      map.controls[googleMaps.ControlPosition.TOP_CENTER].push(document.getElementById('pac-input'));

      googleMaps.event.addListener(searchBox, 'places_changed', function() {
        searchBox.set('map', null);
   
   
        var places = searchBox.getPlaces();
   
        var bounds = new googleMaps.LatLngBounds();
        var i, place;
        for (i = 0; place = places[i]; i++) {
          (function(place) {
            var marker = new googleMaps.Marker({
   
              position: place.geometry.location
            });
            marker.bindTo('map', searchBox, 'map');
            googleMaps.event.addListener(marker, 'map_changed', function() {
              if (!this.getMap()) {
                this.unbindAll();
              }
            });
            bounds.extend(place.geometry.location);
          }(place));
        }
        map.fitBounds(bounds);
        searchBox.set('map', map);
        map.setZoom(Math.min(map.getZoom(),16));
   
      });
    })
    .catch(err => {
      alert('No maps')
    })
  }

  onCancel() {
    this.modalCntrl.dismiss();
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