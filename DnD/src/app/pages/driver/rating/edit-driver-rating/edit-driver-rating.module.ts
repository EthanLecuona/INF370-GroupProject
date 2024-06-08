import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditDriverRatingPageRoutingModule } from './edit-driver-rating-routing.module';

import { EditDriverRatingPage } from './edit-driver-rating.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditDriverRatingPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditDriverRatingPage]
})
export class EditDriverRatingPageModule {}
