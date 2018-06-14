import { Route } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/login/login.component';

export const ROUTES: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
];
