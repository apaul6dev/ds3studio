import { Component, OnInit } from '@angular/core';
import { AyudaService } from './ayuda.service';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaComponent implements OnInit {

  datosAyuda: any;;

  constructor(private ayudaService: AyudaService) {

  }

  ngOnInit() {
    this.obtenerDatos();
  }

  llamar(numero: any) {

    if (!numero) {
      return;
    }

    console.log('llamando ... ');

  }

  obtenerDatos() {
    this.ayudaService.recuperarInfoAyuda().subscribe(rs => {
      this.datosAyuda = rs;
      console.log(rs);
    });
    /*this.authHttp.post(
      '/userapp/recuperarInfoAyuda/',
      null,
      (datos) => {
        console.log(datos);

        if (datos) {
          this.datosAyuda = datos;

        }
        this.zone.run(() => {
          console.log('force update the screen');
        });
      },
      (error) => {
        console.log('Error' + error);
      }
    ); */
  }

}
