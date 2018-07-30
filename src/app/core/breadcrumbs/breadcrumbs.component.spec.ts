import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { APP_BASE_HREF } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumbs.component';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;
  const MockActivatedRoute = { snapshot: { params: {} } };
  let ActivatedRouteService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      declarations: [BreadcrumbsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: ActivatedRoute, useValue: MockActivatedRoute },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize list of links', () => {
    expect(component.links).toEqual([{
      name: 'List of Courses',
      to: '/',
    }]);
    ActivatedRouteService = TestBed.get(ActivatedRoute);
    ActivatedRouteService.snapshot.params.id = 1;
    fixture.detectChanges();
    expect(component.links).toEqual([{
      name: 'List of Courses',
      to: '/',
    }, {
      name: 'Course Details',
    }]);
  });
});
