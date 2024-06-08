import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditModelPageRoutingModule } from './edit-model-routing.module';

import { EditModelPage } from './edit-model.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditModelPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditModelPage]
})
export class EditModelPageModule {}
