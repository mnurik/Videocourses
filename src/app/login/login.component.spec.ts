import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { APP_BASE_HREF } from '../../../node_modules/@angular/common';
import { FormsModule, ReactiveFormsModule } from '../../../node_modules/@angular/forms';
import { RouterModule } from '../../../node_modules/@angular/router';
import { UserInterface } from '../shared/user-interface';
import { LoginRequestAction } from '../store/actions/login.actions';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let StoreStub;
  const fakeUser: Partial<UserInterface> = { login: 'admin', password: '123' };

  beforeEach(async(() => {
    StoreStub = jasmine.createSpyObj('Store', ['dispatch', 'pipe']);
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), FormsModule, ReactiveFormsModule, MatInputModule, BrowserAnimationsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: Store, useValue: StoreStub },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch LoginRequestAction when onSubmit method called', () => {
    component.loginForm.setValue(fakeUser);
    component.onSubmit();
    expect(StoreStub.dispatch.calls.count()).toBe(1);
    expect(StoreStub.dispatch.calls.argsFor(0)).toEqual(new LoginRequestAction(fakeUser));
  });

  it('should call login method in service for onSubmit method', () => {
    const onSubmitSpy = spyOn(component, 'onSubmit');
    component.loginForm.setValue(fakeUser);
    expect(fixture.nativeElement.querySelector('[name="inputLogin"]').value).toBe('admin');
    expect(fixture.nativeElement.querySelector('[name="inputPassword"]').value).toBe('123');
    const hostElement = fixture.nativeElement;
    const submitButton: HTMLElement = hostElement.querySelector('button[type="submit"]');
    submitButton.click();
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
    expect(StoreStub.dispatch.calls.argsFor(0)).toEqual(new LoginRequestAction(fakeUser));
  });

});
