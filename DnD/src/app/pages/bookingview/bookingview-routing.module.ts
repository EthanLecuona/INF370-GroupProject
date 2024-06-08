import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingviewPage } from './bookingview.page';

const routes: Routes = [
  {
    path: '',
    component: BookingviewPage
  },
  {
    path: 'bookinginfo/:bookid/:cecid/:statusid/:Date',
    loadChildren: () => import('./bookinginfo/bookinginfo.module').then( m => m.BookinginfoPageModule)
  },
  {
    path: 'tracking/:bookid',
    loadChildren: () => import('./tracking/tracking.module').then( m => m.TrackingPageModule)
  },
  {
    path: 'transportinfo/:eventId/:Date/:bookingId',
    loadChildren: () => import('./transportinfo/transportinfo.module').then( m => m.TransportinfoPageModule)
  },
  {
    path: 'help/:id',
    loadChildren: () => import('../home/help/help.module').then( m => m.HelpPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingviewPageRoutingModule {}
