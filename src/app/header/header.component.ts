import { Component, OnInit } from '@angular/core';

interface UserInterface {
  Id: number,
  FirstName: string,
  LastName: string
}

class User implements UserInterface {
  constructor(public Id, public FirstName, public LastName) {

  }
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
