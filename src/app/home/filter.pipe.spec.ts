import { CourseInterface } from '../shared/course-interface';
import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let pipe;
  // Todo: I am not sure how we can say to typescript that this variable
  // should implement some fields from CourseInterface, but not all.
  const mockCourses = [
    {
      id: 0,
      description: 'test desc',
      title: 'test title',
      creationDate: '111',
    },
    {
      id: 1,
      description: 'test 2',
      title: 'test 2',
      creationDate: '222',
    },
  ];
  beforeAll(() => {
    pipe = new FilterPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter given list items', () => {
    expect(pipe.transform(mockCourses, 'test desc')).toEqual([mockCourses[0]]);
    expect(pipe.transform(mockCourses, '222')).toEqual([mockCourses[1]]);
  });
});
