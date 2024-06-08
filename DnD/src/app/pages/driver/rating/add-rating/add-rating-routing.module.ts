import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddRatingPage } from './add-rating.page';

const routes: Routes = [
  {
    path: '',
    component: AddRatingPage
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
export class AddRatingPageRoutingModule {}
