import { CourseClass } from './course-class';

export const mockCourses = [
  new CourseClass(0, 'Learn Angular', 'Angular is Awesome', '11/11/2011', 50, [
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
    '11/11/2011',
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
  new CourseClass(2, 'Learn React', 'React is Awesome', '11/11/2011', 230, [
    {
      id: 1370,
      firstName: 'Polly',
      lastName: 'Sosa',
    },
  ]),
  new CourseClass(3, 'Learn Vue', 'Vue is Awesome', '11/11/2011', 30, [
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
