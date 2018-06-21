import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
} from '@angular/material';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ListComponent } from './course-list/course-list.component';
import { CourseComponent } from './course/course.component';
import { HomeRoutingModule } from './home-routing.module';
import { MainComponent } from './main/main.component';
import { ToolboxComponent } from './toolbox/toolbox.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    HomeRoutingModule,
  ],
  exports: [MainComponent],
  declarations: [
    MainComponent,
    ToolboxComponent,
    BreadcrumbsComponent,
    ListComponent,
    CourseComponent,
  ],
})
export class HomeModule { }
