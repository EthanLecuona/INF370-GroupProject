import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventPage } from './event.page';

const routes: Routes = [
  {
    path: '',
    component: EventPage,
  },
  {
    path: 'add-event',
    loadChildren: () => import('./add-event/add-event.module').then(m => m.AddEventPageModule)
  },
  {
    path: 'edit-event/:id',
    loadChildren: () => import('./edit-event/edit-event.module').then(m => m.EditEventPageModule)
  },
  {
    path: 'delete-event/:id',
    loadChildren: () => import('./delete-event/delete-event.module').then(m => m.DeleteEventPageModule)
  },
  {
    path: 'view-event/:id',
    loadChildren: () => import('./view-event/view-event.module').then( m => m.ViewEventPageModule)
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
export class EventPageRoutingModule {}
