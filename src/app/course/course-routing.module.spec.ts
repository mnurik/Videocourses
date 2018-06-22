import { CourseRoutingModule } from './course-routing.module';

describe('courseRoutingModule', () => {
  let courseRoutingModule: CourseRoutingModule;

  beforeEach(() => {
    courseRoutingModule = new CourseRoutingModule();
  });

  it('should create an instance', () => {
    expect(courseRoutingModule).toBeTruthy();
  });
});
