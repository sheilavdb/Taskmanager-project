// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { TaskComponent } from './components/task/task.component';

// Define your routes here
const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: '', component: TaskComponent },
];

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(appRoutes), // Add RouterModule with the routes directly here
  ],
  bootstrap: [],
})
export class AppModule {}
