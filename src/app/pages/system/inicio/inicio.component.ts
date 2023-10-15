import { Component, OnInit } from "@angular/core";
import { InicioService } from './inicio.service';
import { Settings } from "src/app/app.settings.model";
import { AppSettings } from "src/app/app.settings";
import { Router } from "@angular/router";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {


  public settings: Settings;
  constructor(public appSettings: AppSettings, private inicioService: InicioService) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {

  }



}