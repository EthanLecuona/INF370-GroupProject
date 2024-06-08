import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectPage } from './project.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectPage
  },
  {
    path: 'add-project',
    loadChildren: () => import('./add-project/add-project.module').then( m => m.AddProjectPageModule)
  },
  {
    path: 'view-project/:id',
    loadChildren: () => import('./view-project/view-project.module').then( m => m.ViewProjectPageModule)
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
export class ProjectPageRoutingModule {}
