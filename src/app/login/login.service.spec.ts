import { inject, TestBed } from '@angular/core/testing';

import { UserInterface } from '../shared/user-interface';
import { LoginService } from './login.service';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService],
    });
  });

  it('should be created', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));

  it('should save user in storage in case of correct login credentials', inject([LoginService], (service: LoginService) => {
    const setItemSpy = spyOn(localStorage, 'setItem');
    service.login('admin', '123');
    expect(setItemSpy.calls.count()).toBe(2);
  }));

  it('should clear storage in case of logout called', inject([LoginService], (service: LoginService) => {
    const clearSpy = spyOn(localStorage, 'clear');
    service.logout();
    expect(clearSpy.calls.count()).toBe(1);
  }));

  it('should clear storage in case of logout called', inject([LoginService], (service: LoginService) => {
    const fakeUser: Partial<UserInterface> = { username: 'test' };
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
