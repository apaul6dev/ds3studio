import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
//import { emailValidator } from '../../theme/utils/app-validators';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { LoginService } from './login.service';
import { CONFIG_NAME, DATA_USER, TOKEN_MESSAGING, TOKEN_NAME } from 'src/app/shared/constants';
import { TokenNotificationsService } from 'src/app/shared/token-notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  public form: UntypedFormGroup;
  public settings: Settings;

  dataUser: any;
  dataConfigUser: any;
  private tokenMessaging: any;

  constructor(public appSettings: AppSettings, public fb: UntypedFormBuilder, public router: Router,
    private loginService: LoginService, private tokenNotificationsService: TokenNotificationsService) {
    this.settings = this.appSettings.settings;
    this.form = this.fb.group({
      'email': ["usrtest2@d3studio.tk", Validators.required],
      'password': ["paul2023", Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.tokenMessaging = localStorage.getItem(TOKEN_MESSAGING);

  }

  public onSubmitLogin(values: any): void {
    if (this.form.valid) {
      const email = values['email'];
      const password = values['password'];

      const params = {
        email: email,
        password: password,
        messaging: this.tokenMessaging
      }
      this.settings.loadingSpinner = true;
      this.loginService.login(params).subscribe(rs => {
        this.settings.loadingSpinner = false;
        //console.log(rs);

        this.dataUser = rs.data;
        this.dataConfigUser = rs.config;

        const data = {
          name: rs.data.nombres,
          lastname: rs.data.apellidos
        }

        sessionStorage.setItem(DATA_USER, JSON.stringify(data));
        sessionStorage.setItem(TOKEN_NAME, this.dataUser.token);
        sessionStorage.setItem(CONFIG_NAME, JSON.stringify(this.dataConfigUser));

        this.tokenNotificationsService.sendTokenToServer(this.tokenMessaging).subscribe(rs => {
          console.log('Messaging token sent to save: ', rs);
        });

        this.router.navigate(['/']);
      });
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.settings.loadingSpinner = false;
    });
  }

}