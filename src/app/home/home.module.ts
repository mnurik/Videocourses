import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { CourseItemComponent } from './course-item/course-item.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CoursesService } from './courses.service';
import { HomeRoutingModule } from './home-routing.module';
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
    RouterModule,
    CoreModule,
  ],
  providers: [
    CoursesService,
  ],
  declarations: [
    ToolboxComponent,
    CourseListComponent,
    CourseItemComponent,
  ],
})
export class HomeModule { }
