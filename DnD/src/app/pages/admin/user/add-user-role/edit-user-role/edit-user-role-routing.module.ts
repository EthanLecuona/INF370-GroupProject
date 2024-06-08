import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditUserRolePage } from './edit-user-role.page';

const routes: Routes = [
  {
    path: '',
    component: EditUserRolePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditUserRolePageRoutingModule {}
