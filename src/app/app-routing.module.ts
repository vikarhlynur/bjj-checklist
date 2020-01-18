import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BjjChecklistComponent } from './bjj-checklist/bjj-checklist.component';
import { BjjChecklistDataComponent } from './bjj-checklist-data/bjj-checklist-data.component';

const routes: Routes = [
  { path: '', component: BjjChecklistComponent, pathMatch: 'full' },
  { path: 'data', component: BjjChecklistDataComponent },
  { path: '**', component: BjjChecklistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
