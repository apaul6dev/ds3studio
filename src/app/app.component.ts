import { Component, OnInit } from '@angular/core';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';
import { PushNotificationService } from './shared/push-notification.service';
import { InicioService } from './pages/system/inicio/inicio.service';
import { TOKEN_MESSAGING } from './shared/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificacionesService } from './pages/system/notificaciones/notificaciones.service';
import { ChatUpdateService } from './pages/system/chat/chat-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public settings: Settings;
  public mesaggeReceived: any = '';

  constructor(public appSettings: AppSettings, private chatUpdateService: ChatUpdateService,
    private inicioService: InicioService, private notificacionesService: NotificacionesService,
    private notificacion: PushNotificationService, public snackBar: MatSnackBar) {
    this.settings = this.appSettings.settings;
    this.notificacion.requestPermission().then(token => {
      console.log('Authorization messaging: ', token);
      if (token) {
        localStorage.setItem(TOKEN_MESSAGING, token.toString());
      } else {
        console.log("No se pudo guardar el token de las notificaciones.");
      }
    });
  }

  ngOnInit(): void {
    this.notificacion.receiveMessage().subscribe(payload => {
      console.log(payload);
      if (payload) {
        const data = payload.data ? payload.data : { contenido: '{}' };
        const contenido = JSON.parse(data.contenido);
        // data notificacion 
        //const titulo = contenido.titulo;
        //const mensaje = contenido.mensaje;
        const notification = payload.notification.title ? payload.notification.title : 'No se ha recuperado la notificacion';
        this.openSnackBar(notification, "OK");
        //this.soundPlayService.soundPlayModoSmart();
        this.mesaggeReceived = payload.notification.title;
        this.inicioService.datosCambio.next(this.mesaggeReceived);
        this.notificacionesService.datosCambio.next(this.mesaggeReceived);
        this.chatUpdateService.datosCambio.next(contenido);
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