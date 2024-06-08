import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignUserRolePageRoutingModule } from './assign-user-role-routing.module';

import { AssignUserRolePage } from './assign-user-role.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignUserRolePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AssignUserRolePage]
})
export class AssignUserRolePageModule {}
