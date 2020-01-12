import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BjjChecklistComponent } from './bjj-checklist/bjj-checklist.component';
import { BjjChecklistDataComponent } from './bjj-checklist-data/bjj-checklist-data.component';

const routes: Routes = [
  { path: '', redirectTo: 'bjj-checklist', pathMatch: 'full' },
  { path: 'bjj-checklist', component: BjjChecklistComponent },
  { path: 'bjj-checklist-data', component: BjjChecklistDataComponent },
  { path: '**', redirectTo: 'bjj-checklist' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
