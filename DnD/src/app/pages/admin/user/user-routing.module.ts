import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPage } from './user.page';

const routes: Routes = [
  {
    path: '',
    component: UserPage
  },
 
  {
    path: 'edit-user-profile/:id',
    loadChildren: () => import('./edit-user-profile/edit-user-profile.module').then( m => m.EditUserProfilePageModule)
  },
  {
    path: 'assign-user-role',
    loadChildren: () => import('./assign-user-role/assign-user-role.module').then( m => m.AssignUserRolePageModule)
  },
  {
    path: 'add-user-role',
    loadChildren: () => import('./add-user-role/add-user-role.module').then( m => m.AddUserRolePageModule)
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
export class UserPageRoutingModule {}
