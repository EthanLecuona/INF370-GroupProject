import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientRegistrationPageRoutingModule } from './client-registration-routing.module';

import { ClientRegistrationPage } from './client-registration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientRegistrationPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ClientRegistrationPage]
})
export class ClientRegistrationPageModule {}
