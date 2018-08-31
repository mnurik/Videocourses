import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '../../../node_modules/@angular/common';
import { LoginEffects } from '../store/effects/login.effects';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    EffectsModule.forFeature([LoginEffects]),
  ],
  exports: [LoginComponent],
  declarations: [LoginComponent],
  providers: [LoginService],
})
export class LoginModule { }
