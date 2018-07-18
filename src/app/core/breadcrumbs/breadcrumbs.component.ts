import { ChangeDetectionStrategy, Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LinkInterface } from './link-interface';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent implements OnInit, DoCheck {
  public links: LinkInterface[];

  constructor(private route: ActivatedRoute) { }

  ngDoCheck() {
    if (this.route.snapshot.params.id) {
      this.links = [...this.links, { name: 'Course Details' }];
    }
  }

  ngOnInit() {
    this.links = [
      {
        name: 'List of Courses',
        to: '/',
      },
    ];
  }
}
