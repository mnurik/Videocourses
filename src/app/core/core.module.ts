import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, RouterModule, MatIconModule],
  exports: [HeaderComponent, FooterComponent, BreadcrumbsComponent],
  declarations: [HeaderComponent, FooterComponent, BreadcrumbsComponent],
})
export class CoreModule { }
