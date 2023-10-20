import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/app.settings';
import { matchingPasswords } from 'src/app/theme/utils/app-validators';
import { Settings } from 'src/app/app.settings.model';
import { UpdatePassService } from './updatepass.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-updatepass',
  templateUrl: './updatepass.component.html',
  styleUrls: ['./updatepass.component.css']
})
export class UpdatePassComponent implements OnInit {

  public form: UntypedFormGroup;
  public settings: Settings;

  constructor(public appSettings: AppSettings, public fb: UntypedFormBuilder, public snackBar: MatSnackBar,
    public router: Router, private updatePassService: UpdatePassService) {
    this.settings = this.appSettings.settings;

    this.form = this.fb.group({
      'oldPassword': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required]
    }, { validator: matchingPasswords('password', 'confirmPassword') });

  }

  ngOnInit(): void {

  }

  public onSubmit(values: any): void {
    if (this.form.valid) {

      let req = {
        pwanterior: values.oldPassword,
        pwnueva: values.password,
      };

      this.updatePassService.actualizarpass(req).subscribe(datos => {
        if (!datos || datos.estado != 'OK') {
          this.openSnackBar(
            datos.mensaje || 'Error en antualizar la contraseña', datos.titulo || 'Error'
          );
        } else {
          this.openSnackBar(

            datos.mensaje || 'Contraseña actualizada correctamente', datos.titulo || 'Correcto'
          );
        }
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }


  ngAfterViewInit() {
    this.settings.loadingSpinner = false;
  }


}
