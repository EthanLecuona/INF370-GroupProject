import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPage } from './user.page';

const routes: Routes = [
  {
    path: '',
    component: UserPage
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'client-registration-form',
    loadChildren: () => import('./client-registration-form/client-registration-form.module').then( m => m.ClientRegistrationFormPageModule)
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
export class UserPageRoutingModule {}
