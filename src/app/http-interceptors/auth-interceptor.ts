import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { LoadingService } from '../loading/loading.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = localStorage.getItem('token');
    let authReq;
    if (authToken) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', authToken),
      });
    }

    this.loadingService.toggle(true);

    return next.handle(authReq || req).pipe(
      map((event) => {
        if (event instanceof HttpResponse) {
          this.loadingService.toggle(false);
        }
        return event;
      }),
    );
  }
}
