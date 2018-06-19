import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/login/login.component';

export const ROUTES: Routes = [
  { path: 'login', loadChildren: './login/login.module#LoginComponent' },
  { path: '', component: HomeComponent, pathMatch: 'full' },
];
