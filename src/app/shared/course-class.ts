import { CourseInterface } from './course-interface';

export class CourseClass implements CourseInterface {
  public liked: boolean;

  constructor(
    public id: number,
    public title: string,
    public description: string,
    public creationDate: number,
    public duration: number,
    public topRated: boolean = false,
  ) { }
}
