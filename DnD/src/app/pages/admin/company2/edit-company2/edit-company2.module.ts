import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCompany2PageRoutingModule } from './edit-company2-routing.module';

import { EditCompany2Page } from './edit-company2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCompany2PageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditCompany2Page]
})
export class EditCompany2PageModule {}
