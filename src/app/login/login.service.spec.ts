import { TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { LoginRequestAction } from '../store/actions/login.actions';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let loginService: LoginService;
  let httpServiceSpy: jasmine.SpyObj<HttpClient>;
  const { payload: mockUser } = new LoginRequestAction({ login: 'admin', password: '123' });

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['post', 'get']);
    TestBed.configureTestingModule({
      providers: [LoginService, { provide: HttpClient, useValue: spy }],
    });
    loginService = TestBed.get(LoginService);
    httpServiceSpy = TestBed.get(HttpClient);
  });

  it('should save user in storage in case of correct login credentials', () => {
    loginService.login(mockUser.login, mockUser.password);
    expect(httpServiceSpy.post.calls.mostRecent().args)
      .toEqual(['http://localhost:3004/auth/login', mockUser]);
  });

  it('should clear storage in case of logout called', () => {
    const clearSpy = spyOn(localStorage, 'clear');
    loginService.logout();
    expect(clearSpy.calls.count()).toBe(1);
  });

  it('userInfo method should call get method with endpoint', () => {
    loginService.getUserInfo();
    expect(httpServiceSpy.get.calls.mostRecent().args)
      .toEqual(['http://localhost:3004/auth/userInfo']);
  });

  it('isAuthenticated should return false', () => {
    const getItemSpy = spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(loginService.isAuthenticated()).toEqual(false);
    expect(getItemSpy.calls.count()).toBe(1);
  });

  it('isAuthenticated should return true if there is token exist', () => {
    const getItemSpy = spyOn(localStorage, 'getItem').and.returnValue('');
    expect(loginService.isAuthenticated()).toEqual(true);
    expect(getItemSpy.calls.count()).toBe(1);
  });
});
