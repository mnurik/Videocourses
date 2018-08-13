import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { APP_BASE_HREF } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoginComponent } from '../../login/login.component';
import { LoginService } from '../../login/login.service';
import { UserInterface } from '../user-interface';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let LoginServiceStub;
  const fakeUser: Partial<UserInterface> = {
    name: {
      first: 'test firstName',
      last: 'test firstName',
    },
  };
  let de;

  beforeEach(async(() => {
    LoginServiceStub = jasmine.createSpyObj('LoginService', ['logout', 'isAuthenticated', 'getUserInfo']);
    LoginServiceStub.getUserInfo.and.returnValue(fakeUser);
    LoginServiceStub.isAuthenticated.and.returnValue(true);
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
    expect(LoginServiceStub.logout).toHaveBeenCalledTimes(1);
  });

  it('should call logout service for log off button click', () => {
    const hostElement = fixture.nativeElement;
    const button: HTMLButtonElement = hostElement.querySelector('.account-container button');
    button.click();
    expect(LoginServiceStub.logout).toHaveBeenCalledTimes(1);
  });
});
