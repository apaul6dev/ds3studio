import { AfterViewInit, Component, OnInit } from "@angular/core";
import { NotificacionesService } from './notificaciones.service';
import { Router } from "@angular/router";
import { DetalleNotificacionService } from "./detalle-notificacion/detalle-notificacion.service";
import { AppSettings } from "src/app/app.settings";
import { Settings } from "src/app/app.settings.model";

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {

  public settings: Settings;
  pagina = 1;
  notifications: any[] = [];

  constructor(public appSettings: AppSettings, private router: Router, private notificacionesService: NotificacionesService,
    private detalleNotificacionService: DetalleNotificacionService) {
    this.settings = this.appSettings.settings;
  }


  ngOnInit(): void {
    this.notificacionesService.datosCambio.subscribe(rs => {
      console.log('resfrescando pantalla notificaciones: ', rs);
      this.addLastNotification();
    });

    this.obtenerDatos(this.pagina);
  }

  loadMoreNotifications() {
    this.pagina += 1;
    this.obtenerDatos(this.pagina);
  }

  addLastNotification() {
    //this.settings.loadingSpinner = true;
    setTimeout(() => {
      this.notificacionesService.obtenerDatos(1).subscribe(resp => {
        //this.settings.loadingSpinner = false;
        console.log("*****", resp);

        if (resp.lista) {
          const listLastOne: [] = resp.lista[0];
          console.log('Last notification', listLastOne);

          listLastOne.forEach((element: { iconoalerta: string }, index: number) => {
            if (element.iconoalerta && element.iconoalerta == 'hand') {
              element.iconoalerta = 'hand-left';
            }
            this.addElementToList(element, true);
          });
        } else {
          console.log('error al cargar la lista de notificaciones!');
        }
        console.log(this.notifications);
      });
    }, 2000);

  }


  obtenerDatos(page: number) {
    //this.notifications = [];
    // console.log(this.notifications, this.pagina);

    //this.firstload = true;
    const solicitud: any = {};
    solicitud.pagina = page;
    //this.settings.loadingSpinner = true;
    this.notificacionesService.obtenerDatos(solicitud).subscribe(resp => {
      //this.settings.loadingSpinner = false;
      if (resp.lista) {
        resp.lista.forEach((element: { iconoalerta: string }, index: number) => {
          // setTimeout(() => {
          if (element.iconoalerta && element.iconoalerta == 'hand') {
            element.iconoalerta = 'hand-left';
          }
          this.addElementToList(element, false);
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

  addElementToList(notification: any, isUpdate: boolean) {
    if (!notification || !notification.id) {
      return;
    }
    notification.usuario = notification.usuario ? notification.usuario.toUpperCase() : '';
    notification.titulo = notification.titulo || (notification.dispositivo ? notification.dispositivo.toUpperCase() : 'DISPOSITIVO');

    if (notification.mensaje) {
      console.log('Mensaje predefinido');
    } else if (notification.accion) {
      notification.mensaje = this.getAccionMensaje(notification);
    }

    notification.since = new Date();

    if (!this.notificationExists(notification)) {
      if (!isUpdate) {
        this.notifications.push(notification);
      } else {
        this.notifications.unshift(notification);
      }

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

  goToNotificationDetail(notification: any) {
    console.log("ver notificacion", notification);
    this.detalleNotificacionService.notification = notification;
    this.router.navigate(['/notificaciones/detalleNotificacion']);
  }


}