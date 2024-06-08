import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientPage } from './client.page';

const routes: Routes = [
  {
    path: '',
    component: ClientPage
  },
  {
    path: 'client-registration/:id/:email/:company',
    loadChildren: () => import('./client-registration/client-registration.module').then( m => m.ClientRegistrationPageModule)
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
export class ClientPageRoutingModule {}
