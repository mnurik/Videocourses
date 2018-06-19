import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [LoginComponent],
  declarations: [LoginComponent],
})
export class LoginModule { }
