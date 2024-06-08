import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditUserProfilePage } from './edit-user-profile.page';

const routes: Routes = [
  {
    path: '',
    component: EditUserProfilePage
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
export class EditUserProfilePageRoutingModule {}
