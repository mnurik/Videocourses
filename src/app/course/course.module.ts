import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    CourseRoutingModule,
    RouterModule,
    CoreModule,
  ],
  declarations: [CourseComponent],
})
export class CourseModule { }
