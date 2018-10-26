import { TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { AuthorsService } from './authors.service';

describe('AuthorsService', () => {
  let authorsService: AuthorsService;
  let httpServiceSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: spy }, AuthorsService],
    });
    httpServiceSpy = TestBed.get(HttpClient);
    authorsService = TestBed.get(AuthorsService);
  });

  it('should be created', () => {
    expect(authorsService).toBeTruthy();
  });

  it('should be created', () => {
    authorsService.load();
    expect(httpServiceSpy.get.calls.mostRecent().args)
      .toEqual(['http://localhost:3004/authors']);
  });
});
