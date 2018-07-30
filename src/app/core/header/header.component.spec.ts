import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { APP_BASE_HREF } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { tick } from '../../../../node_modules/@angular/core/src/render3';
import { By } from '../../../../node_modules/@angular/platform-browser';
import { LoginComponent } from '../../login/login.component';
import { LoginService } from '../../login/login.service';
import { UserClass } from '../user-class';
import { UserInterface } from '../user-interface';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let LoginServiceStub;
  const fakeUser: Partial<UserInterface> = {
    firstName: 'test firstName',
    lastName: 'test firstName',
  };
  let de;

  beforeEach(async(() => {
    LoginServiceStub = jasmine.createSpyObj('LoginService', ['logout', 'isAuthenticated', 'getUserInfo']);
    LoginServiceStub.getUserInfo.and.returnValue(fakeUser);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'login', component: LoginComponent }])],
      declarations: [HeaderComponent, LoginComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: LoginService, useValue: LoginServiceStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout service for onLogout method', () => {
    component.onLogOut();
    expect(LoginServiceStub.logout.calls.count()).toBe(2);

    // TODO: Fix these tests
    // const hostElement = fixture.nativeElement;
    // const button: HTMLInputElement = hostElement.querySelector('button');
    // button.dispatchEvent(new Event('click'));
    // expect(LoginServiceStub.logout.calls.count()).toBe(4);
  });
});
