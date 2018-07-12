import { Pipe, PipeTransform } from '@angular/core';
import { CourseInterface } from '../shared/course-interface';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {

  transform(courses: CourseInterface[], text: string = ''): CourseInterface[] {
    return courses.filter((course: CourseInterface) => {
      const re = new RegExp(text, 'i');
      return (`${course.description} ${course.title} ${course.creationDate}`).match(re);
    });
  }

}
