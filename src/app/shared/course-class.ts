import { CourseInterface } from './course-interface';

export class CourseClass implements CourseInterface {
  public liked: boolean;

  constructor(
    public id: number,
    public name: string,
    public description: string,
    public creationDate: number,
    public duration: number,
    public authors: string,
    public isTopRated: boolean = false,
  ) {}
}
