import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NotificacionesService } from './notificaciones.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {

  pagina = 1;
  notifications: any[] = [];

  constructor(private router: Router, private notificacionesService: NotificacionesService) {
  }

  ngOnInit(): void {
    this.obtenerDatos(this.pagina);
  }

  loadMoreNotifications() {
    this.pagina += 1;
    this.obtenerDatos(this.pagina);
  }

  goToNotificationDetail(notificacion: any) {
    console.log("ver notificacion", notificacion);

    //this.router.navigate(['/detalle', id]);
  }


  obtenerDatos(page: number) {
    this.notifications = [];
    // console.log(this.notifications, this.pagina);

    //this.firstload = true;
    const solicitud: any = {};
    solicitud.pagina = page;

    this.notificacionesService.obtenerDatos(solicitud).subscribe(resp => {

      if (resp.lista) {
        resp.lista.forEach((element: { iconoalerta: string }, index: number) => {
          // setTimeout(() => {
          if (element.iconoalerta && element.iconoalerta == 'hand') {
            element.iconoalerta = 'hand-left';
          }
          this.addElementToList(element);
          // }, index * 100); 
        });

      } else {
        console.log('error al cargar la lista de notificaciones!');
      }

      console.log(this.notifications);

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
 
          console.log(this.notifications);
 
          this.pagina += 1;
          const count = resp.lista ? Object.keys(resp.lista).length : 0;
          if (count === 0) {
            this.hayMasResultados = false;
          } else {
            this.hayMasResultados = true;
          }
 
          this.utilitarios.ordernarLista(this.notifications, 'id', 'desc');
 
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

    obj.usuario = obj.usuario ? obj.usuario.toUpperCase() : obj.usuario;
    obj.titulo = obj.titulo ? obj.titulo : obj.dispositivo ? obj.dispositivo.toUpperCase() : 'DISPOSITIVO';

    if (obj.mensaje) {
      console.log('Predefined mensaje');
    } else if (obj.accion) {
      obj.mensaje = this.getAccionMensaje(obj);
    }

    obj.since = new Date();

    if (!this.notificationExists(obj)) {
      this.notifications.push(obj);
    }
  }

  getAccionMensaje(obj: any): string {
    const { accion, valor, usuario } = obj;

    switch (accion) {
      case 'tiempoabiertoexcesivo':
        return `TIEMPO EXCESIVO ${valor == 1 ? 'DETECTADO' : 'FINALIZADO'}`;
      case 'corriente':
        return `EL DISPOSITIVO ${valor == 1 ? 'HA ENTRADO A TRABAJAR CON CORRIENTE' : 'HA DEJADO DE TRABAJAR CON CORRIENTE'}`;
      case 'bateria':
        return `EL DISPOSITIVO ${valor == 1 ? 'HA ENTRADO A TRABAJAR CON BATERIA' : 'HA DEJADO DE TRABAJAR CON BATERIA'}`;
      case 'encendido':
        return `EL DISPOSITIVO ${valor == 1 ? 'HA SIDO ENCENDIDO' : 'HA SIDO APAGADO'}${usuario ? ` POR ${usuario}` : ''}`;
      case 'abierto':
        return `EL DISPOSITIVO ${valor == 1 ? 'HA SIDO ABIERTO' : 'HA SIDO CERRADO'}${usuario ? ` POR ${usuario}` : ''}`;
      case 'energizado':
        return `EL DISPOSITIVO ${valor == 1 ? 'HA SIDO ENERGIZADO (ACTIVADO)' : 'HA DESENERGIZADO (DESACTIVADO)'}${usuario ? ` POR ${usuario}` : ''}`;
      case 'intrusion':
        return `INTRUSION ${valor == 1 ? 'DETECTADA' : 'FINALIZADA'} EN EL DISPOSITIVO`;
      case 'forzado':
        return `FORZADO ${valor == 1 ? 'DETECTADO' : 'FINALIZADO'} EN EL DISPOSITIVO`;
      case 'audio':
        return this.getAudioAccionMensaje(obj);
      case 'encendido1':
        return `LA ALARMA DE ROBOS ${valor == 1 ? 'HA SIDO ENCENDIDA' : 'HA SIDO APAGADA'}${usuario ? ` POR ${usuario}` : ''}`;
      case 'encendido2':
        return `LA ALARMA DE INCENDIO ${valor == 1 ? 'HA SIDO ENCENDIDA' : 'HA SIDO APAGADA'}${usuario ? ` POR ${usuario}` : ''}`;
      case 'encendido3':
        return `LA ALARMA DE EMERGENCIA MEDICA ${valor == 1 ? 'HA SIDO ENCENDIDA' : 'HA SIDO APAGADA'}${usuario ? ` POR ${usuario}` : ''}`;
      default:
        return '';
    }
  }

  getAudioAccionMensaje(obj: any): string {
    const { valor, usuario } = obj;
    if (valor === 10) {
      return `EL PERIFONEO ${valor === 0 ? 'HA SIDO DESACTIVADO' : `HA SIDO ACTIVADO${usuario ? ` POR ${usuario}` : ''}`}`;
    } else {
      return `EL AUDIO ${valor === 0 ? 'HA SIDO APAGADO' : `#${valor} HA SIDO REPRODUCIDO EN EL DISPOSITIVO${usuario ? ` POR ${usuario}` : ''}`}`;
    }
  }

  notificationExists(obj: any): boolean {
    return this.notifications.some((notification) => notification.id === obj.id);
  }


}