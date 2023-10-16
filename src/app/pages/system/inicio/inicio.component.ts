import { Component, OnInit, ViewChild } from "@angular/core";
import { InicioService } from './inicio.service';
import { Settings } from "src/app/app.settings.model";
import { AppSettings } from "src/app/app.settings";
import { Router } from "@angular/router";
import { MatProgressBar } from "@angular/material/progress-bar";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  progress: number = 0;
  timerId: any;
  duration: number = 3000;

  public settings: Settings;
  constructor(public appSettings: AppSettings, private inicioService: InicioService) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {

  }










  

  startPressTimer() {
    // Reiniciar el progreso
    this.progress = 1;
    this.timerId = setTimeout(() => {
      console.log('Botón presionado por 3 segundos completos');
    }, this.duration);
    // Actualizar el progreso
    this.updateProgress();
  }

  stopPressTimer() {
    // Detener el temporizador si se suelta el botón antes de 3 segundos
    clearTimeout(this.timerId);
    // Reiniciar el progreso
    this.progress = 0;
  }

  updateProgress() {
    // Actualizar el progreso mientras el botón está presionado
    if (this.progress > 0 && this.progress < 100) {
      this.progress += 1;
      setTimeout(() => this.updateProgress(), this.duration / 100);
    }
  }



}