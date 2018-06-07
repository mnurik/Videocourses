import { Component, OnInit } from '@angular/core';

interface CourseInterface {
  id: number,
  title: string,
  creationDate: string,
  duration: number,
  description: string
}

class Course implements CourseInterface {
  constructor(public id, public title, public creationDate, public duration, public description) {

  }

  edit(title, description) {
    this.title = title;
    this.description = description;
  }
}

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course: object;

  constructor() {
    this.course = new Course(0, "Learn Angular", "01.01.2018", 120, "Angular is awesome");
  }

  ngOnInit() {
  }

}
