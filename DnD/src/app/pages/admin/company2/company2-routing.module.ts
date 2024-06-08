import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Company2Page } from './company2.page';

const routes: Routes = [
  {
    path: '',
    component: Company2Page
  },
  {
    path: 'add-company',
    loadChildren: () => import('./add-company2/add-company2.module').then( m => m.AddCompany2PageModule)
  },
  {
    path: 'edit-company/:id',
    loadChildren: () => import('./edit-company2/edit-company2.module').then( m => m.EditCompany2PageModule)
  },
  {
    path: 'view-company/:id',
    loadChildren: () => import('./view-company2/view-company2.module').then( m => m.ViewCompany2PageModule)
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
export class Company2PageRoutingModule {}
