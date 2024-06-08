import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewCompany2PageRoutingModule } from './view-company2-routing.module';

import { ViewCompany2Page } from './view-company2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewCompany2PageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ViewCompany2Page]
})
export class ViewCompany2PageModule {}
