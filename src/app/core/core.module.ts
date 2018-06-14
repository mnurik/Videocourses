import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, RouterModule],
  exports: [HeaderComponent, FooterComponent],
  declarations: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
