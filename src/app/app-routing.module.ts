import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './NotFound/not-found/not-found.component';

export const routes: Routes = [
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: 'course', loadChildren: './course/course.module#CourseModule' },
  { path: '', loadChildren: './home/home.module#HomeModule', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }
