import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentFormComponent } from './assignment-form/assignment-form.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'create', component: AssignmentFormComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
