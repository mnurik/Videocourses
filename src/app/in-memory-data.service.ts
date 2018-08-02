import { InMemoryDbService } from 'angular-in-memory-web-api';
import { mockCourses } from './shared/mock-data';

export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    return {
      courses: mockCourses,
    };
  }
}
