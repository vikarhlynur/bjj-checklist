import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BjjChecklistComponent } from './bjj-checklist/bjj-checklist.component';

const routes: Routes = [
  { path: 'bjj-checklist', component: BjjChecklistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
