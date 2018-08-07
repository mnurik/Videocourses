import { ChangeDetectionStrategy, Component, Input, OnInit, OnChanges } from '@angular/core';
import { LinkInterface } from './link-interface';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent implements OnInit, OnChanges {
  @Input() addLinks: LinkInterface[];
  public links: LinkInterface[];

  constructor() { }

  ngOnChanges() {
    this.links = [...this.links, ...this.addLinks];
  }

  ngOnInit() {
    this.links = [
      {
        name: 'Courses',
        to: '/',
      },
    ];
  }
}
