import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { emailValidator } from '../../theme/utils/app-validators';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { LoginService } from './login.service';
import { CONFIG_NAME, TOKEN_NAME } from 'src/app/shared/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  public form: UntypedFormGroup;
  public settings: Settings;

  dataUser: any;
  dataConfigUser: any;

  constructor(public appSettings: AppSettings, public fb: UntypedFormBuilder, public router: Router,
    private loginService: LoginService
  ) {
    this.settings = this.appSettings.settings;
    this.form = this.fb.group({
      'email': ["usrtest2@d3studio.tk",  Validators.required],
      'password': ["paul2023", Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  public onSubmitLogin(values: any): void {
    if (this.form.valid) {
      const email = values['email'];
      const password = values['password'];
      this.loginService.login({ email, password }).subscribe(rs => {

        console.log(rs);
        
        this.dataUser = rs.data;
        this.dataConfigUser = rs.config;

        this.loginService.datosCambio.next(rs.data);

        sessionStorage.setItem(TOKEN_NAME, this.dataUser.token);
        sessionStorage.setItem(CONFIG_NAME, JSON.stringify(this.dataConfigUser));

        this.router.navigate(['/']);
      });
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.settings.loadingSpinner = false;
    });
  }

  recordarPassword(){
      console.log();
      
  }

}