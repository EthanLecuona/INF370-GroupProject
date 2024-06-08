import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientRegistrationFormPageRoutingModule } from './client-registration-form-routing.module';

import { ClientRegistrationFormPage } from './client-registration-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientRegistrationFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ClientRegistrationFormPage]
})
export class ClientRegistrationFormPageModule {}
