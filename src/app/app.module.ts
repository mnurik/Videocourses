import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
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
import { authorReducer } from './store/reducers/authors.reducer';
import { coursesReducer } from './store/reducers/courses.reducer';
import { loginReducer } from './store/reducers/login.reducer';

@NgModule({
  declarations: [AppComponent, NotFoundComponent, LoadingComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule,
    CourseModule.forRoot(),
    HttpClientModule,
    StoreModule.forRoot({ courses: coursesReducer, login: loginReducer, authors: authorReducer }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
    }),
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule { }
