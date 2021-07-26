import {Component, Injector, OnInit} from '@angular/core';
import {AppComponentBase} from '../../shared/app-component-base';
import {AuthServiceProxy, UserDto} from '../../shared/service-proxies/service-proxies';

@Component({templateUrl: 'admin.component.html'})
export class AdminComponent extends AppComponentBase implements OnInit {
  loading = false;
  users: UserDto[] = [];

  constructor(injector: Injector, private authServiceProxy: AuthServiceProxy) {
    super(injector);
  }

  ngOnInit() {
    // TODO: ADD GET ALL FUNCTION TO AUTH SERVICES
    this.loading = false;
  }
}
