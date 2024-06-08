import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignUserRolePage } from './assign-user-role.page';

const routes: Routes = [
  {
    path: '',
    component: AssignUserRolePage
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
export class AssignUserRolePageRoutingModule {}
