import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingviewPageRoutingModule } from './bookingview-routing.module';

import { BookingviewPage } from './bookingview.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingviewPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [BookingviewPage]
})
export class BookingviewPageModule {}
