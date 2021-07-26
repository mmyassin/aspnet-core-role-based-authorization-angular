import {Component, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {AppComponentBase} from '../shared/app-component-base';

@Component({selector: 'app', templateUrl: 'app.component.html'})
export class AppComponent extends AppComponentBase {
  constructor(injector: Injector, private router: Router) {
    super(injector);
  }
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
