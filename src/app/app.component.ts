import { Component, OnInit } from '@angular/core';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public settings: Settings;
  constructor(public appSettings: AppSettings, private swUpdate: SwUpdate) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New version available. Load it?')) {
          window.location.reload();
        }
      });
    }
  }
}