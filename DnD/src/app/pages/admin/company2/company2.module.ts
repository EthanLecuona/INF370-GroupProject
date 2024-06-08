import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Ng2SearchPipeModule} from 'ng2-search-filter'
import { IonicModule } from '@ionic/angular';

import { Company2PageRoutingModule } from './company2-routing.module';

import { Company2Page } from './company2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Company2PageRoutingModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  declarations: [Company2Page]
})
export class Company2PageModule {}
