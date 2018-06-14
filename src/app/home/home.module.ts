import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
} from '@angular/material';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ListComponent } from './course-list/course-list.component';
import { CourseComponent } from './course/course.component';
import { HomeComponent } from './home/home.component';
import { ToolboxComponent } from './toolbox/toolbox.component';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
  ],
  exports: [HomeComponent],
  declarations: [
    HomeComponent,
    ToolboxComponent,
    BreadcrumbsComponent,
    ListComponent,
    CourseComponent,
  ],
})
export class HomeModule {}
