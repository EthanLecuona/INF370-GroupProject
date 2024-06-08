import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditLicenscodePageRoutingModule } from './edit-licenscode-routing.module';

import { EditLicenscodePage } from './edit-licenscode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditLicenscodePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditLicenscodePage]
})
export class EditLicenscodePageModule {}
