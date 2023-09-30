import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { emailValidator } from '../../theme/utils/app-validators';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  public form: UntypedFormGroup;
  public settings: Settings;

  /*
  usrtest1@d3studio.tk
  usrtest2@d3studio.tk
  usrtest3@d3studio.tk

  paul2023
  */

  constructor(public appSettings: AppSettings, public fb: UntypedFormBuilder, public router: Router,
    private loginService: LoginService
  ) {
    this.settings = this.appSettings.settings;
    this.form = this.fb.group({
      'email': ["usrtest1@d3studio.tk", Validators.compose([Validators.required, emailValidator])],
      'password': ["paul2023", Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  public onSubmit(values: any): void {
    if (!this.form.valid) {
      const email = values['email'];
      const password = values['password'];
      this.loginService.login({ email, password })
        .then(response => {
          console.log(response);
          this.router.navigate(['/']);
        }
        ).catch(error => console.log(error))
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.settings.loadingSpinner = false;
    });
  }
}