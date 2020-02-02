import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChecklistDataComponent } from './checklist-data/checklist-data.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: ChecklistComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'data', component: ChecklistDataComponent },
  { path: '**', component: ChecklistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
