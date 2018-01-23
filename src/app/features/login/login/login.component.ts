import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, TempStateService } from '../../../core/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  public errorMessage: string;
  returnUrl: string;

  constructor(
    private auth: AuthService,
    private router: Router,
    private stateService: TempStateService
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.stateService.oldUrl || '/';
    this.initForm();
  }
  get login() {
    return this.form.get('login');
  }
  get password() {
    return this.form.get('password');
  }

  initForm() {
    this.form = new FormGroup({
      login: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    const authModel = this.form.value;
    this.auth
      .authenticate(authModel.login, authModel.password)
      .subscribe(response => {
        if (response) {
          this.router.navigateByUrl(this.returnUrl);
        }
        this.errorMessage = 'Authentication Failed';
      });
  }
}
