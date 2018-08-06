import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { LinkInterface } from './link-interface';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent implements OnInit {
  @Input() addLinks: LinkInterface[];
  public links: LinkInterface[];

  constructor() {}

  ngOnInit() {
    this.links = [
      {
        name: 'Courses',
        to: '/',
      },
    ];
  }
}
