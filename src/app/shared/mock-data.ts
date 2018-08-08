import { CourseClass } from './course-class';

export const mockCourses = [
  new CourseClass(0, 'Learn Angular', 'Angular is Awesome', 1514761200000, 50, [
    {
      id: 1370,
      firstName: 'Polly',
      lastName: 'Sosa',
    },
  ], true),
  new CourseClass(
    1,
    'Learn TypeScript',
    'Lorem ipsum dolor sit amet.',
    1484175600000,
    120,
    [
      {
        id: 1370,
        firstName: 'Polly',
        lastName: 'Sosa',
      },
    ],
    true,
  ),
  new CourseClass(2, 'Learn React', 'React is Awesome', 1546297200000, 230, [
    {
      id: 1370,
      firstName: 'Polly',
      lastName: 'Sosa',
    },
  ]),
  new CourseClass(3, 'Learn Vue', 'Vue is Awesome', new Date().getTime(), 30, [
    {
      id: 1370,
      firstName: 'Polly',
      lastName: 'Sosa',
    },
    {
      id: 1371,
      firstName: 'John',
      lastName: 'Doe',
    },
  ], true),
];
