import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddLicenscodePageRoutingModule } from './add-licenscode-routing.module';

import { AddLicenscodePage } from './add-licenscode.page';
import {  Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddLicenscodePageRoutingModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  declarations: [AddLicenscodePage]
})
export class AddLicenscodePageModule {}
