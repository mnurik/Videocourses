import { inject, TestBed } from '@angular/core/testing';

import { LoginService } from './login.effects';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService],
    });
  });

  it('should be created', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));
});
