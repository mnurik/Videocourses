import humanize from "humanize-duration";
import { CourseInterface } from "./course-interface";

export class CourseClass implements CourseInterface {
  constructor(public id, public title, public description, public creationDate, public duration) {
  }

  getReadableDuration() {
    return humanize(this.duration * 60 * 1000);
  }
};
