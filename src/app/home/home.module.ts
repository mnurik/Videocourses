import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ToolboxComponent } from './toolbox/toolbox.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ListComponent } from './course-list/course-list.component';
import { CourseComponent } from './course/course.component';
import { MatInputModule, MatIconModule, MatListModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatButtonModule
  ],
  exports: [
    HomeComponent
  ],
  declarations: [
    HomeComponent,
    ToolboxComponent,
    BreadcrumbsComponent,
    ListComponent,
    CourseComponent
  ]
})
export class HomeModule { }
