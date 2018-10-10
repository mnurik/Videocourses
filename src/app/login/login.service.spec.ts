import { inject, TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../shared/user-interface';
import { LoginService } from './login.service';

fdescribe('LoginService', () => {
  let loginService: LoginService;
  let httpServiceSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['post', 'get']);
    TestBed.configureTestingModule({
      providers: [LoginService, { provide: HttpClient, useValue: spy }],
    });
    loginService = TestBed.get(LoginService);
    httpServiceSpy = TestBed.get(HttpClient);
  });

  fit('should save user in storage in case of correct login credentials', () => {
    loginService.login('admin', '123');
    expect(httpServiceSpy.post.calls.mostRecent().args)
      .toEqual(['http://localhost:3004/auth/login', { login: 'admin', password: '123' }]);
  });

  it('should clear storage in case of logout called', inject([LoginService], (service: LoginService) => {
    const clearSpy = spyOn(localStorage, 'clear');
    service.logout();
    expect(clearSpy.calls.count()).toBe(1);
  }));

  it('should clear storage in case of logout called', inject([LoginService], (service: LoginService) => {
    const fakeUser: Partial<UserInterface> = { login: 'test' };
    const getItemSpy = spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(fakeUser));
    expect(service.getUserInfo()).toEqual(fakeUser);
    expect(getItemSpy.calls.count()).toBe(1);
  }));

  it('should clear storage in case of logout called', inject([LoginService], (service: LoginService) => {
    const getItemSpy = spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(service.isAuthenticated()).toEqual(false);
    expect(getItemSpy.calls.count()).toBe(1);
  }));
});
