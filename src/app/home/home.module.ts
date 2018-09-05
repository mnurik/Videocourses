import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { CoreModule } from '../core/core.module';
import { CoursesEffects } from '../store/effects/courses.effects';
import { CourseItemComponent } from './course-item/course-item.component';
import { CourseListComponent } from './course-list/course-list.component';
import { FilterPipe } from './filter.pipe';
import { HomeRoutingModule } from './home-routing.module';
import { ReadableDurationPipe } from './readable-duration.pipe';
import { StatusDirective } from './status.directive';
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
    EffectsModule.forFeature([CoursesEffects]),
    ReactiveFormsModule,
  ],
  declarations: [
    ToolboxComponent,
    CourseListComponent,
    CourseItemComponent,
    ReadableDurationPipe,
    StatusDirective,
    FilterPipe,
  ],
})
export class HomeModule { }
