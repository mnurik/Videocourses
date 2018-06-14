import { Component, OnInit } from '@angular/core';
import { UserClass } from '../user-class';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: UserClass;

  constructor() {
    this.user = new UserClass(0, 'Nurlan', 'Mirzayev');
  }

  ngOnInit() {}
}
