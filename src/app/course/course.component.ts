import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import humanize from "humanize-duration";

export interface CourseInterface {
  id: number,
  title: string,
  creationDate: string,
  duration: number,
  description: string
}

export class CourseClass implements CourseInterface {
  constructor(public id, public title, public description, public creationDate, public duration) {
  }

  getReadableDuration() {
    return humanize(this.duration * 60 * 1000);
  }
}

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  @Input() course: CourseInterface;
  @Output() delete = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

}
