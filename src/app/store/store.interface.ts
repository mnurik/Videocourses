import { CourseInterface } from '../shared/course-interface';

export interface AppState {
  login: string;
  courses: {
    start: number;
    limit: number;
    list: CourseInterface[];
    course: CourseInterface;
  };
}
