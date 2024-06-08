import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditUserRolePageRoutingModule } from './edit-user-role-routing.module';

import { EditUserRolePage } from './edit-user-role.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditUserRolePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditUserRolePage]
})
export class EditUserRolePageModule {}
