import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditRatingPageRoutingModule } from './edit-rating-routing.module';

import { EditRatingPage } from './edit-rating.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditRatingPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditRatingPage]
})
export class EditRatingPageModule {}
