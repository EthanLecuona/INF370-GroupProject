import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditFuelPricePage } from './edit-fuel-price.page';

const routes: Routes = [
  {
    path: '',
    component: EditFuelPricePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditFuelPricePageRoutingModule {}
