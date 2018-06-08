import { Component, OnInit } from '@angular/core';
import { CourseInterface, CourseClass } from "./../course/course.component";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  courses: CourseInterface[] = [
    new CourseClass(0, "Learn Angular", "Angular Awesome", "01.01.2018", 50),
    new CourseClass(
      1,
      "Learn TypeScript",
      "Lorem ipsum dolor sit amet, patrioque gloriatur comprehensam no eum, no eos inermis nonumes accusamus, no maiorum repudiandae eos. Ius no erat iuvaret, vim cu diam posse dolore putant rationibus pro in. Eu ius veniam gloriatur, vide mediocritatem et nam. Vel ea corrumpit mnesarchum. Te ius summo vulputate mnesarchum.",
      "01.12.2017",
      120
    )
  ];

  constructor() { }

  ngOnInit() {
  }

  onDelete(id: number) {
    this.courses = this.courses.filter((course: CourseInterface) => course.id !== id);
  }

}
