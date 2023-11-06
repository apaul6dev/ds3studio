import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';
import { PushNotificationService } from './shared/push-notification.service';
import { InicioService } from './pages/system/inicio/inicio.service';
import { TOKEN_MESSAGING } from './shared/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificacionesService } from './pages/system/notificaciones/notificaciones.service';
import { ChatUpdateService } from './pages/system/chat/chat-update.service';
import { SoundPlayService } from './shared/play-sound.service';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, map } from 'rxjs/operators';
import { DispositivosService } from './pages/system/dispositivos/dispositivos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  public settings: Settings;
  public mesaggeReceived: any = '';

  constructor(public appSettings: AppSettings, private swUpdate: SwUpdate, private dispositivosService: DispositivosService,
    private soundPlayService: SoundPlayService, private chatUpdateService: ChatUpdateService,
    private inicioService: InicioService, private notificacionesService: NotificacionesService,
    private notificacion: PushNotificationService, public snackBar: MatSnackBar) {
    this.settings = this.appSettings.settings;

    if (this.swUpdate.isEnabled) {
      /*
      this.swUpdate.versionUpdates.pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
        map(evt => ({
          type: 'UPDATE_AVAILABLE',
          current: evt.currentVersion,
          available: evt.latestVersion,
        }))); */

        this.swUpdate.available.subscribe(evt => {
          const snack = this.snackBar.open('Update Available', 'Reload Please.');
          snack.onAction().subscribe(() => {
            window.location.reload();
          });
          setTimeout(() => {
            snack.dismiss();
          }, 10000);
        });
        
    }

    this.notificacion.requestPermission().then(token => {
      console.log('Authorization messaging: ', token);
      if (token) {
        localStorage.setItem(TOKEN_MESSAGING, token.toString());
      } else {
        console.log("No se pudo guardar el token de las notificaciones.");
      }
    });
  }

  ngAfterViewInit() {
   // window.location.reload();
  }

  ngOnInit(): void {
    this.notificacion.receiveMessage().subscribe(payload => {
      console.log(payload);
      if (payload) {
        this.mesaggeReceived = payload.notification.title;
        const data = payload.data ? payload.data : { contenido: '{}' };
        const contenido = JSON.parse(data.contenido);

        if (contenido.type === 'msg') {
          const notification = payload.notification.title ? payload.notification.title : 'No se ha recuperado la notificacion';
          this.chatUpdateService.datosCambio.next(contenido);
          this.soundPlayService.soundPlayChat();
          this.openSnackBar(notification, "OK");
        } else {

          const titulo = contenido.titulo;
          const mensaje = contenido.mensaje;
          this.openSnackBar(mensaje, titulo);
          this.soundPlayService.soundPlayModoSmart();
          this.inicioService.datosCambio.next(this.mesaggeReceived);
          this.notificacionesService.datosCambio.next(this.mesaggeReceived);
          this.dispositivosService.datosCambio.next(this.mesaggeReceived);
        }

      } else {
        console.log("No se ha podido recuperar la notificacion");
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

}