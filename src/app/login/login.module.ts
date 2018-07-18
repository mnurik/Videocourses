import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

@NgModule({
  imports: [
    LoginRoutingModule,
    FormsModule,
  ],
  exports: [LoginComponent],
  declarations: [LoginComponent],
  providers: [LoginService],
})
export class LoginModule { }
