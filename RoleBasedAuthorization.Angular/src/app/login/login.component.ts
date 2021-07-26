import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthServiceProxy, LoginInputDto} from '../../shared/service-proxies/service-proxies';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _authServiceProxy: AuthServiceProxy
  ) {
    // redirect to home if already logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user != null) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    let inputDto = new LoginInputDto();
    inputDto.username = this.f.username.value;
    inputDto.password = this.f.password.value;
    this.loading = true;
    this._authServiceProxy.authenticate(inputDto)
      .subscribe(result => {
        localStorage.setItem('user', JSON.stringify(result));
        // get return url from query parameters or default to home page
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        const nav = this.router.navigateByUrl(returnUrl);
      }, error => {
        this.error = 'incorrect username or password';
        this.loading = false;
      });
  }
}
