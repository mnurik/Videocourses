import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatInputModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { CoursesService } from '../home/courses.service';
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
