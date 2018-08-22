import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent implements OnInit {
  public status$ = new BehaviorSubject(null);

  constructor(public loadingService: LoadingService) { }

  ngOnInit() {
    this.loadingService.visible().subscribe((value) => this.status$.next(value));
  }
}
