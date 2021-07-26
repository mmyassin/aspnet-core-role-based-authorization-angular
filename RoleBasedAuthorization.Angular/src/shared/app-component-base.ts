import {Component, Injector} from '@angular/core';
import {UserDto} from '../shared/service-proxies/service-proxies';

export abstract class AppComponentBase {

  protected constructor(injector: Injector) {
  }

  get user() {
    return JSON.parse(localStorage.getItem('user'));
  }
  isGranted(roleName: string): boolean {
    return this.user.role === roleName;
  }
}
