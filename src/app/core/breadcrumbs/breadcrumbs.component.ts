import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CoursesService } from '../../home/courses.service';
import { LinkInterface } from './link-interface';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent implements OnInit {
  public links: LinkInterface[];

  constructor(private route: ActivatedRoute, private coursesService: CoursesService) { }

  ngOnInit() {
    this.links = [
      {
        name: 'Courses',
        to: '/',
      },
    ];

    this.route.paramMap.subscribe((params: ParamMap) => {
      const currentCourse = this.coursesService.getById(params.get('id'));
      this.links = [...this.links, { name: currentCourse.title }];
    });
  }
}
