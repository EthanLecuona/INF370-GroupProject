import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FuelPricePage } from './fuel-price.page';

const routes: Routes = [
  {
    path: '',
    component: FuelPricePage
  },
  {
    path: 'edit-fuel-price/:id',
    loadChildren: () => import('./edit-fuel-price/edit-fuel-price.module').then( m => m.EditFuelPricePageModule)
  },
  {
    path: 'help/:id',
    loadChildren: () => import('../../home/help/help.module').then( m => m.HelpPageModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuelPricePageRoutingModule {}
