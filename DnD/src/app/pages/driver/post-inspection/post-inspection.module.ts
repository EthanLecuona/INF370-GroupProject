import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostInspectionPageRoutingModule } from './post-inspection-routing.module';

import { PostInspectionPage } from './post-inspection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostInspectionPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PostInspectionPage]
})
export class PostInspectionPageModule {}
