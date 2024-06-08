import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BookinginfoPageRoutingModule } from './bookinginfo-routing.module';
import { BookinginfoPage } from './bookinginfo.page';
import { NgxQRCodeModule } from 'ngx-qrcode2';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookinginfoPageRoutingModule, 
    NgxQRCodeModule,
    

  ],
  declarations: [BookinginfoPage]
})
export class BookinginfoPageModule {}
