import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCompany2PageRoutingModule } from './add-company2-routing.module';

import { AddCompany2Page } from './add-company2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCompany2PageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddCompany2Page]
})
export class AddCompany2PageModule {}
