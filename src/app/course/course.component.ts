import { Component, OnInit } from '@angular/core';

interface CourseInterface {
  Id: number,
  Title: string,
  CreationDate: string,
  Duration: number,
  Description: string
}

class Course implements CourseInterface {
  constructor(public Id, public Title, public CreationDate, public Duration, public Description) {

  }

  edit(Title, Description) {
    this.Title = Title;
    this.Description = Description;
  }
}

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
