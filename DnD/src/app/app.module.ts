import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule} from 'ng2-search-filter';
import { BarcodeScanner} from '@ionic-native/barcode-scanner/ngx'
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { NgChartsModule } from 'ng2-charts';
//Report Stuff
import {FileOpener } from '@ionic-native/file-opener/ngx'
import {File} from '@ionic-native/file/ngx'
// import { AuthModule } from '@auth0/auth0-angular';
import config from '../../capacitor.config';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CommonModule } from '@angular/common';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';
import { Keepalive, NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { NgIdleModule } from '@ng-idle/core';
// import { Geofence } from '@ionic-native/geofence'

// URL that Auth0 should redirect back to
// const redirectUri = `${config.appId}://YOUR_DOMAIN/capacitor/${config.appId}/callback`;
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    NgChartsModule,
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule, 
    Ng2SearchPipeModule, 
    ReactiveFormsModule, 
    NgxQRCodeModule, 
    BrowserAnimationsModule,
    NgIdleKeepaliveModule.forRoot()
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, SQLite, SQLitePorter, Geolocation, BarcodeScanner, StatusBar, SplashScreen, OneSignal, File, FileOpener, BackgroundMode, NgIdleModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
