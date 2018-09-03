import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from '../store/effects/login.effects';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, RouterModule, MatIconModule, EffectsModule.forFeature([LoginEffects])],
  exports: [HeaderComponent, FooterComponent, BreadcrumbsComponent],
  declarations: [HeaderComponent, FooterComponent, BreadcrumbsComponent],
})
export class CoreModule { }
