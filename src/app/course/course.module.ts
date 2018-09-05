import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { CoreModule } from '../core/core.module';
import { CoursesService } from '../home/courses.service';
import { AuthorsEffects } from '../store/effects/authors.effects';
import { CoursesEffects } from '../store/effects/courses.effects';
import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    CourseRoutingModule,
    RouterModule,
    CoreModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    FormsModule,
    EffectsModule.forFeature([CoursesEffects, AuthorsEffects]),
    MatSelectModule,
    ReactiveFormsModule,
  ],
  declarations: [CourseComponent],
})
export class CourseModule {
  public static forRoot() {
    return {
      ngModule: CommonModule,
      providers: [CoursesService],
    };
  }
}
