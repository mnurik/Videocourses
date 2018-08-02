import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { APP_BASE_HREF } from '../../../node_modules/@angular/common';
import { FormsModule } from '../../../node_modules/@angular/forms';
import { RouterModule } from '../../../node_modules/@angular/router';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let LoginServiceStub;

  beforeEach(async(() => {
    LoginServiceStub = jasmine.createSpyObj('LoginService', ['login']);
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), FormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: LoginService, useValue: LoginServiceStub },
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

  it('should call login method in service for onSubmit method', () => {
    component.onSubmit('admin1', '123');
    expect(LoginServiceStub.login.calls.count()).toBe(1);
  });

  it('should call login method in service for onSubmit method', () => {
    const onSubmitSpy = spyOn(component, 'onSubmit');
    fixture.nativeElement.querySelector('#inputEmail').value = 'admin';
    fixture.nativeElement.querySelector('#inputPassword').value = '123';
    const hostElement = fixture.nativeElement;
    const submitButton: HTMLElement = hostElement.querySelector('button[type="submit"]');
    submitButton.click();
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
    expect(onSubmitSpy).toHaveBeenCalledWith('admin', '123');
  });

});
