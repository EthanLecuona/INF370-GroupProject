import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDriverRatingPage } from './add-driver-rating.page';

const routes: Routes = [
  {
    path: '',
    component: AddDriverRatingPage
  },
  {
    path: 'help/:id',
    loadChildren: () => import('../../../home/help/help.module').then( m => m.HelpPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDriverRatingPageRoutingModule {}
