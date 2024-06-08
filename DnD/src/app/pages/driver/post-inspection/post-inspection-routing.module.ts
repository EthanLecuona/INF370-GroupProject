import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostInspectionPage } from './post-inspection.page';

const routes: Routes = [
  {
    path: '',
    component: PostInspectionPage
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
export class PostInspectionPageRoutingModule {}
