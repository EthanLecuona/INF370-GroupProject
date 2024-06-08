import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUserRolePage } from './add-user-role.page';

const routes: Routes = [
  {
    path: '',
    component: AddUserRolePage
  },
  {
    path: 'edit-user-role/:id',
    loadChildren: () => import('./edit-user-role/edit-user-role.module').then( m => m.EditUserRolePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUserRolePageRoutingModule {}
