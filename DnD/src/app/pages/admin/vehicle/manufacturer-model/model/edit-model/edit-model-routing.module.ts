import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditModelPage } from './edit-model.page';

const routes: Routes = [
  {
    path: '',
    component: EditModelPage
  },
  {
    path: 'help/:id',
    loadChildren: () => import('../../../../../home/help/help.module').then( m => m.HelpPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditModelPageRoutingModule {}
