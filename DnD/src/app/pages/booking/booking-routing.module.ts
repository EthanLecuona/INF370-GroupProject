import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingPage } from './booking.page';

const routes: Routes = [
  {
    path: '',
    component: BookingPage
  },
  {
    path: 'parcel-type',
    loadChildren: () => import('./parcel/parcel-type/parcel-type.module').then( m => m.ParcelTypePageModule)
  },
  {
    path: 'parcel-confident',
    loadChildren: () => import('./parcel/parcel-confident/parcel-confident.module').then( m => m.ParcelConfidentPageModule)
  },
  {
    path: 'parcel-priority',
    loadChildren: () => import('./parcel/parcel-priority/parcel-priority.module').then( m => m.ParcelPriorityPageModule)
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
export class BookingPageRoutingModule {}
