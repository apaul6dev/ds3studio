import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NotificacionesService } from './notificaciones.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {

  pagina = 1;
  items: any[] = [];

  fakeUsers: Array<any> = new Array(5);

  constructor(private notificacionesService: NotificacionesService) { }

  ngOnInit(): void {
    this.obtenerDatos();


  }

  obtenerDatos() {

    //this.firstload = true;
    const solicitud: any = {};
    solicitud.pagina = this.pagina;

    this.notificacionesService.obtenerDatos(solicitud).subscribe(resp => {
      console.log(resp);

      if (resp.lista) {
        resp.lista.forEach((element: { iconoalerta: string; }) => {
          if (element.iconoalerta && element.iconoalerta == 'hand') {
            element.iconoalerta = 'hand-left';
          }
          this.addElementToList(element);
        });
      }

      console.log(this.items);


    });

    /*
    this.firstload = true;
    const solicitud: any = {};
    solicitud.pagina = this.pagina;
 
    this.authHttp.post(
      '/controlDispositivos/listarEventos/',
      solicitud,
      (resp) => {
        this.zone.run(() => {
          if (this.utilitarios.handleError(resp)) {
            console.log('Error');
            return;
          }
 
          console.log('Eventos listados...');
 
          this.firstload = false;
 
          this.exito = true;
 
          if (resp.lista) {
            resp.lista.forEach((element) => {
              if (element.iconoalerta && element.iconoalerta == 'hand') {
                element.iconoalerta = 'hand-left';
              }
              this.addElementToList(element);
            });
          }
 
          console.log(this.items);
 
          this.pagina += 1;
          const count = resp.lista ? Object.keys(resp.lista).length : 0;
          if (count === 0) {
            this.hayMasResultados = false;
          } else {
            this.hayMasResultados = true;
          }
 
          this.utilitarios.ordernarLista(this.items, 'id', 'desc');
 
          console.log('force update the screenxxxx');
        });
      },
      (error) => {
        console.log('Error' + error);
        this.exito = true;
        if (this.utilitarios.handleError(null)) {
          console.log('Error');
          return;
        }
      }
    ); */
  }

  addElementToList(obj: any) {
    if (!obj || !obj.id) {
      return;
    }

    if (obj.usuario) {
      obj.usuario = obj.usuario.toUpperCase();
    }


    if (!obj.titulo) {
      obj.titulo = obj.dispositivo
        ? obj.dispositivo.toUpperCase()
        : 'DISPOSITIVO';
    }

    if (obj.mensaje) {
      console.log("Predefined mensaje");
    } else if (obj.accion) {
      const accion = obj.accion;
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!' + accion);
      if (accion == 'tiempoabiertoexcesivo') {
        obj.mensaje =
          'TIEMPO EXCESIVO ' + (obj.valor == 1 ? 'DETECTADO' : 'FINALIZADO');
      }
      if (accion == 'corriente') {
        obj.mensaje =
          'EL DISPOSITIVO  ' +
          (obj.valor == 1
            ? ' HA ENTRADO A TRABAJAR CON CORRIENTE'
            : ' HA DEJADO DE TRABAJAR CON CORRIENTE');
      }
      if (accion == 'bateria') {
        obj.mensaje =
          'EL DISPOSITIVO  ' +
          (obj.valor == 1
            ? ' HA ENTRADO A TRABAJAR CON BATERIA'
            : ' HA DEJADO DE TRABAJAR CON BATERIA');
      }

      if (accion == 'encendido') {
        obj.mensaje =
          'EL DISPOSITIVO  ' +
          (obj.valor == 1 ? ' HA SIDO ENCENDIDO' : ' HA SIDO APAGADO');

        if (obj.usuario) {
          obj.mensaje = obj.mensaje + ' POR ' + obj.usuario;
        }




      }

      if (accion == 'abierto') {
        obj.mensaje =
          'EL DISPOSITIVO  ' +
          (obj.valor == 1 ? ' HA SIDO ABIERTO' : ' HA SIDO CERRADO');

        if (obj.usuario) {
          obj.mensaje = obj.mensaje + ' POR ' + obj.usuario;
        }
      }

      if (accion == 'energizado') {
        obj.mensaje =
          'EL DISPOSITIVO  ' +
          (obj.valor == 1
            ? ' HA SIDO ENERGIZADO (ACTIVADO)'
            : ' HA DESENERGIZADO (DESACTIVADO)');

        if (obj.usuario) {
          obj.mensaje = obj.mensaje + ' POR ' + obj.usuario;
        }
      }

      if (accion == 'intrusion') {
        obj.mensaje =
          'INTRUSION ' +
          (obj.valor == 1 ? 'DETECTADA' : 'FINALIZADA') +
          ' EN EL DISPOSITIVO';
      }

      if (accion == 'forzado') {
        obj.mensaje =
          'FORZADO ' +
          (obj.valor == 1 ? 'DETECTADO' : 'FINALIZADO') +
          ' EN EL DISPOSITIVO ';
      }


      if (accion == 'audio' && obj.valor == 10) {

        obj.mensaje =
          'EL PERIFONEO ' +
          (obj.valor == 0
            ? 'HA SIDO DESACTIVADO'
            : ' HA SIDO ACTIVADO');

        if (obj.usuario) {
          obj.mensaje = obj.mensaje + ' POR ' + obj.usuario;
        }

      } else if (accion == 'audio') {
        obj.mensaje =
          'EL AUDIO ' +
          (obj.valor == 0
            ? 'HA SIDO APAGADO'
            : '#' + obj.valor + ' HA SIDO REPRODUCIDO') +
          ' EN EL DISPOSITIVO ';

        if (obj.usuario) {
          obj.mensaje = obj.mensaje + ' POR ' + obj.usuario;
        }
      }

      if (accion == 'encendido1') {
        obj.mensaje =
          'LA ALARMA DE ROBOS ' +
          (obj.valor == 1 ? ' HA SIDO ENCENDIDA' : ' HA SIDO APAGADA');

        if (obj.usuario) {
          obj.mensaje = obj.mensaje + ' POR ' + obj.usuario;
        }
      }

      if (accion == 'encendido2') {
        obj.mensaje =
          'LA ALARMA DE INCENDIO ' +
          (obj.valor == 1 ? ' HA SIDO ENCENDIDA' : ' HA SIDO APAGADA');

        if (obj.usuario) {
          obj.mensaje = obj.mensaje + ' POR ' + obj.usuario;
        }
      }

      if (accion == 'encendido3') {
        obj.mensaje =
          'LA ALARMA DE EMERGENCIA MEDICA ' +
          (obj.valor == 1 ? ' HA SIDO ENCENDIDA' : ' HA SIDO APAGADA');

        if (obj.usuario) {
          obj.mensaje = obj.mensaje + ' POR ' + obj.usuario;
        }
      }
    }

    obj.since = new Date();
    if (this.items.filter((a) => a.id == obj.id).length == 0) {
      this.items.push(obj);
      /*
      this.zone.run(() => {
        console.log('force update the screen');
      }); */

      console.log('oush');
      console.log(this.items.length);
    } else {
      /*
      for (let index = 0; index < this.items.length; index++) {
        let element = this.items[index];

        if (element.id == obj.id) {
          this.items[index] = obj;
          this.zone.run(() => {
            console.log('force update the screen');
          });
          console.log('rep');
          console.log(this.items.length);
          return;
        }
      }
      */
    }
    console.log(this.items.length);
  }
}