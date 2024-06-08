import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientRegistrationFormPage } from './client-registration-form.page';

const routes: Routes = [
  {
    path: '',
    component: ClientRegistrationFormPage
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
export class ClientRegistrationFormPageRoutingModule {}
