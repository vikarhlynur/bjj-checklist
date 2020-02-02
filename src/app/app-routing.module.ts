import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BjjChecklistDataComponent } from './checklist-data/checklist-data.component';
import { BjjChecklistComponent } from './checklist/checklist.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: BjjChecklistComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'data', component: BjjChecklistDataComponent },
  { path: '**', component: BjjChecklistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
