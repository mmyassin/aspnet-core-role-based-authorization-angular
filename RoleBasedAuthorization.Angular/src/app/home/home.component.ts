import {Component, Injector, OnInit} from '@angular/core';
import {AppComponentBase} from '../../shared/app-component-base';


@Component({templateUrl: 'home.component.html'})
export class HomeComponent extends AppComponentBase implements OnInit {
  loading = false;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.loading = false;
  }
}
