import { Component, OnInit } from '@angular/core';

interface UserInterface {
  id: number,
  firstName: string,
  lastName: string
}

class User implements UserInterface {
  constructor(public id, public firstName, public lastName) {

  }
}

let someValue: any = "this is a string";

let strLength: number = someValue.length;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: object;

  constructor() {
    this.user = new User(0, "Nurlan", "Mirzayev");
  }

  ngOnInit() {
  }

}
