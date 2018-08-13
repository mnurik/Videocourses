import { async, inject, TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { LoginService } from './login/login.service';

describe('AuthGuard', () => {
  let instance;
  let LoginServiceStub;

  beforeEach(() => {
    LoginServiceStub = jasmine.createSpyObj('LoginService', ['isAuthenticated']);
    LoginServiceStub.isAuthenticated.and.returnValue(true);
    instance = new AuthGuard(LoginServiceStub);
    TestBed.configureTestingModule({ providers: [{ provide: LoginService, useValue: LoginServiceStub }] });
  });

  it('should work', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should call service method for canLoad', () => {
    instance.canLoad();
    expect(LoginServiceStub.isAuthenticated).toHaveBeenCalled();
  });

  it('should call service method for canLoad', () => {
    expect(instance.canLoad()).toBeTruthy();
  });
});
