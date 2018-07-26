import { CourseClass } from './course-class';

export const mockCourses = [
  new CourseClass(0, 'Learn Angular', 'Angular is Awesome', 1514761200000, 50, 'Mike', true),
  new CourseClass(
    1,
    'Learn TypeScript',
    'Lorem ipsum dolor sit amet, patrioque gloriatur comprehensam no eum, no eos inermis nonumes accusamus, no maiorum repudiandae eos. Ius no erat iuvaret, vim cu diam posse dolore putant rationibus pro in. Eu ius veniam gloriatur, vide mediocritatem et nam. Vel ea corrumpit mnesarchum. Te ius summo vulputate mnesarchum.',
    1484175600000,
    120,
    'John Doe',
    true,
  ),
  new CourseClass(2, 'Learn React', 'React is Awesome', 1546297200000, 230, 'Howard'),
  new CourseClass(3, 'Learn Vue', 'Vue is Awesome', new Date().getTime(), 30, 'John Doe, Alex', true),
];
