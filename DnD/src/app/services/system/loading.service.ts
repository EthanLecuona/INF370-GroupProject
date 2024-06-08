import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading : boolean = false
  constructor(private loadingController: LoadingController) { }

  // Simple loader
  async simpleLoader() {
    this.isLoading = true
    this.loadingController.create({
        showBackdrop: false,
        message: 'Loading...'
    }).then((response) => {
        response.present().then(() => {
          console.log('Loading...')
          if(!this.isLoading) {
            response.dismiss().then(() => console.log('Done Loading'))
          }
        }) ;
    });
  }
  // Dismiss loader
  async dismissLoader() {
    this.isLoading = false
    this.loadingController.dismiss().then((response) => {
        console.log('Loading Done');
    })
  }

  // Auto hide show loader
  autoLoader() {
    this.loadingController.create({
      message: '<img src="http://localhost:8100\\DnD\\src\\assets\\Animations\\bear.svg">',
      cssClass: 'loader-animation',
      translucent: true,
      showBackdrop: false,
      spinner: null,
      duration: 2000
    }).then((response) => {
      response.present();
      response.onDidDismiss().then((response) => {
        console.log('Loader dismissed', response);
      });
    });
  } 
  // Custom style + hide on tap loader
  customLoader() {
    this.loadingController.create({
      message: 'Loader with custom style',
      duration: 4000,
      cssClass:'loader-css-class',
      backdropDismiss:true
    }).then((res) => {
      res.present();
    });
  }

}
