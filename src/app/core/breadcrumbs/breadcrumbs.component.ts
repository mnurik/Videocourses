import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
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
    this.links = [{
      name: 'Courses',
      to: '/',
    }, ...this.addLinks];
  }

  ngOnInit() { }
}
