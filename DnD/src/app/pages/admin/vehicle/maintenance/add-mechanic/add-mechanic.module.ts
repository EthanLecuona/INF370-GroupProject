import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMechanicPageRoutingModule } from './add-mechanic-routing.module';

import { AddMechanicPage } from './add-mechanic.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddMechanicPageRoutingModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
  ],
  declarations: [AddMechanicPage]
})
export class AddMechanicPageModule {}
