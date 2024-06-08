import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RatingPage } from './rating.page';

const routes: Routes = [
  {
    path: '',
    component: RatingPage
  },
  {
    path: 'add-rating',
    loadChildren: () => import('./add-rating/add-rating.module').then( m => m.AddRatingPageModule)
  },
  {
    path: 'edit-rating/:id',
    loadChildren: () => import('./edit-rating/edit-rating.module').then( m => m.EditRatingPageModule)
  },
  {
    path: 'add-driver-rating',
    loadChildren: () => import('./add-driver-rating/add-driver-rating.module').then( m => m.AddDriverRatingPageModule)
  },
  {
    path: 'edit-driver-rating/:id',
    loadChildren: () => import('./edit-driver-rating/edit-driver-rating.module').then( m => m.EditDriverRatingPageModule)
  },
  {
    path: 'help/:id',
    loadChildren: () => import('../../home/help/help.module').then( m => m.HelpPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RatingPageRoutingModule {}
