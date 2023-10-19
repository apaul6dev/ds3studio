import { Component, OnInit } from '@angular/core';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';
import { MessagingService } from './shared/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public settings: Settings;

  constructor(public appSettings: AppSettings, private messageService: MessagingService) {
    this.settings = this.appSettings.settings;
    this.messageService.requestPermission();
    this.messageService.receiveMessage();
  }

  ngOnInit(): void {
    this.messageService.currentMessage.subscribe(resp => {
      console.log('Mensaje', resp);

    });
  }



}