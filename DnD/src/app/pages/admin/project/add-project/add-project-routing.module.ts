import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { AddProjectPage } from './add-project.page';

const routes: Routes = [
  {
    path: '',
    component: AddProjectPage
  },
  {
    path: 'help/:id',
    loadChildren: () => import('../../../home/help/help.module').then( m => m.HelpPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes) ],
  exports: [RouterModule],
})
export class AddProjectPageRoutingModule {}
