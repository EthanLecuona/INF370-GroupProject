import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditLicenscodePage } from './edit-licenscode.page';

const routes: Routes = [
  {
    path: '',
    component: EditLicenscodePage
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
export class EditLicenscodePageRoutingModule {}
