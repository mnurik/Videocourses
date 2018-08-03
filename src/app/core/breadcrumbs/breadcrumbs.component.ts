import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { LinkInterface } from './link-interface';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent implements OnInit {
  public links: LinkInterface[];

  constructor() { }

  ngOnInit() {
    this.links = [
      {
        name: 'Courses',
        to: '/',
      },
    ];
  }
}
