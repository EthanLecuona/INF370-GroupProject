import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteMaintenancePage } from './delete-maintenance.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteMaintenancePage
  },
  {
    path: 'help/:id',
    loadChildren: () => import('../../../../home/help/help.module').then( m => m.HelpPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteMaintenancePageRoutingModule {}
