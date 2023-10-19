import { Component, OnInit } from '@angular/core';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';
import { MessageService } from './shared/messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public settings: Settings;

  constructor(public appSettings: AppSettings, private messageService: MessageService) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
   
  }



}