import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AppSettings } from 'src/app/app.settings';
import { Settings } from 'src/app/app.settings.model';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayudaoutside.component.html',
  styleUrls: ['./ayudaoutside.component.css']
})
export class AyudaOutSideComponent implements OnInit, AfterViewInit {

  public settings: Settings;

  constructor(public appSettings: AppSettings) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.settings.loadingSpinner = false;
  }


}
