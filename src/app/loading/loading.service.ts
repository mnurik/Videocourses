import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private show$ = new BehaviorSubject(false);
  constructor() { }

  public toggle(status: boolean): void {
    this.show$.next(status);
  }

  public visible(): Observable<boolean> {
    return this.show$;
  }
}
