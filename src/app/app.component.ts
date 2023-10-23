import { Component, OnInit } from '@angular/core';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';
import { PushNotificationService } from './shared/push-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  mesaggeReceived: any = '';
  public settings: Settings;

  constructor(public appSettings: AppSettings, private notificacion: PushNotificationService) {
    this.settings = this.appSettings.settings;
    this.settings = this.appSettings.settings;
    notificacion.requestPermission().then(token => {
      console.log(token);
    });
  }

  ngOnInit(): void {
    this.notificacion.receiveMessage().subscribe(payload => {
      console.log(payload);
      this.mesaggeReceived = payload.notification.title;
    })
  }



}