import { Component, OnInit } from '@angular/core';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';
import { SoundPlayService } from './shared/play-sound.service';
import { PushNotificationService } from './shared/push-notification.service';
import { TokenNotificationsService } from './shared/token-notification.service';
import { InicioService } from './pages/system/inicio/inicio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public settings: Settings;
  public mesaggeReceived: any = '';

  constructor(public appSettings: AppSettings, private soundPlayService: SoundPlayService, private inicioService: InicioService,
    private notificacion: PushNotificationService, private tokenNotificationsService: TokenNotificationsService) {
    this.settings = this.appSettings.settings;
    this.notificacion.requestPermission().then(token => {
      console.log(token);
      this.tokenNotificationsService.sendTokenToServer(token).subscribe(rs => {
        console.log(rs)
      });
    });

  }

  ngOnInit(): void {
    this.notificacion.receiveMessage().subscribe(payload => {
      console.log(payload);
      this.soundPlayService.soundPlayModoSmart();
      this.mesaggeReceived = payload.notification.title;
      this.inicioService.datosCambio.next(this.mesaggeReceived);
    });
  }

}