import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditEventPage } from './edit-event.page';

const routes: Routes = [
  {
    path: '',
    component: EditEventPage
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
export class EditEventPageRoutingModule {}
