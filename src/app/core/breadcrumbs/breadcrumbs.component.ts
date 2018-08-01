import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { CoursesService } from '../../home/courses.service';
import { LinkInterface } from './link-interface';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  public links: LinkInterface[];
  private routerSubscription: Subscription;

  constructor(private route: ActivatedRoute, private coursesService: CoursesService) { }

  ngOnInit() {
    this.links = [
      {
        name: 'Courses',
        to: '/',
      },
    ];

    this.routerSubscription = this.route.paramMap.subscribe((params: ParamMap) => {
      const currentCourse = this.coursesService.getById(params.get('id'));
      if (currentCourse) {
        this.links = [...this.links, { name: currentCourse.title }];
      }
    });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}
