import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { APP_BASE_HREF } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { LogoutAction } from 'src/app/store/actions/login.actions';
import { AppState } from 'src/app/store/store.interface';
import { LoginComponent } from '../../login/login.component';
import { LoginService } from '../../login/login.service';
import { UserInterface } from '../../shared/user-interface';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let LoginServiceStub: jasmine.SpyObj<LoginService>;
  let StoreStub: jasmine.SpyObj<Store<AppState>>;
  const fakeUser: Partial<UserInterface> = {
    name: {
      first: 'test firstName',
      last: 'test firstName',
    },
  };
  let de;

  beforeEach(async(() => {
    LoginServiceStub = jasmine.createSpyObj('LoginService', ['logout', 'isAuthenticated', 'getUserInfo']);
    StoreStub = jasmine.createSpyObj('Store', ['dispatch', 'pipe']);
    LoginServiceStub.getUserInfo.and.returnValue(fakeUser);
    LoginServiceStub.isAuthenticated.and.returnValue(true);
    StoreStub.pipe.and.returnValue(of(fakeUser));
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'login', component: LoginComponent }]), ReactiveFormsModule],
      declarations: [HeaderComponent, LoginComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: LoginService, useValue: LoginServiceStub },
        { provide: Store, useValue: StoreStub },
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
    component.logout();
    expect(StoreStub.dispatch.calls.mostRecent().args).toEqual([new LogoutAction()]);
  });

  it('should call logout service for log off button click', () => {
    const hostElement = fixture.nativeElement;
    const button: HTMLButtonElement = hostElement.querySelector('.account-container button');
    button.click();
    expect(StoreStub.dispatch.calls.mostRecent().args).toEqual([new LogoutAction()]);
  });
});
