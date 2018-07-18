import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course.component';

const routes: Routes = [
  { path: ':id', component: CourseComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  declarations: [],
})
export class CourseRoutingModule { }
