import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CourseModule } from './course/course.module';
import { httpInterceptorProviders } from './http-interceptors';
import { LoadingComponent } from './loading/loading.component';
import { NotFoundComponent } from './not-found/not-found/not-found.component';
import { courseReducer } from './store/reducers/courses';

@NgModule({
  declarations: [AppComponent, NotFoundComponent, LoadingComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule,
    CourseModule.forRoot(),
    HttpClientModule,
    StoreModule.forRoot(courseReducer),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
    }),
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule { }
