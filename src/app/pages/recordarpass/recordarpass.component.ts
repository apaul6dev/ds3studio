import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { emailValidator, matchingEmail, matchingPasswords } from 'src/app/theme/utils/app-validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecordarPassService } from './recordarpass.service';

@Component({
  selector: 'app-recordarpass',
  templateUrl: './recordarpass.component.html',
  styleUrls: ['./recordarpass.component.css']
})
export class RecordarPassComponent implements OnInit {

  public form: UntypedFormGroup;

  constructor(public fb: UntypedFormBuilder, public snackBar: MatSnackBar,
    public router: Router, private recordarPassService: RecordarPassService) {

    this.form = this.fb.group({
      'email': ['f@gmail.com',  Validators.required],
      'confirmEmail': ['f@gmail.com',  Validators.required]
    }, { validator: matchingEmail('email', 'confirmEmail') });
  }

  ngOnInit(): void {

  }

  public onSubmit(values: any): void {
    console.log(values, this.form.valid);
    
    if (this.form.valid) {

      let req = {
        correo: values.email,
      };

      this.recordarPassService.recordarPass(req).subscribe(datos => {
        console.log('recordando', datos);
        
        if (!datos || datos.estado != 'OK') {
          this.openSnackBar(
            datos.mensaje || 'Ocurrio un error, verifique su conexión', datos.titulo || 'Error'
          );
        } else {
          this.openSnackBar(

            datos.mensaje || 'Correcto', datos.titulo || 'Correcto'
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


}
