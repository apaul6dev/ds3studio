import { Component, OnInit } from "@angular/core";
import { InicioService } from './inicio.service';
import { Settings } from "src/app/app.settings.model";
import { AppSettings } from "src/app/app.settings";
import { Router } from "@angular/router";
import { GelocationService } from "src/app/shared/geolocation.service";
import { CONFIG_NAME, CONFING, IMAGENES } from "src/app/shared/constants";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  dispositivo: any = { encender1: 0, encender2: 0, encender3: 0 };
  coordenadas = { latitud: 0, longitud: 0 };
  config = CONFING;
  imagenes = { ...IMAGENES };
  progress: number = 0;
  timerId: any;
  duration: number = 2000;
  public settings: Settings;

  constructor(
    public appSettings: AppSettings,
    public snackBar: MatSnackBar,
    private gelocationService: GelocationService,
    private router: Router,
    private inicioService: InicioService
  ) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
    this.getConfigAppStart();
    this.inicioService.datosCambio.subscribe(rs => {
      this.obtenerDatos();
    });
  }

  getConfigAppStart() {
    const resp = this.gelocationService.obtenerGeolocalizacion();
    this.coordenadas.latitud = resp.latitude;
    this.coordenadas.longitud = resp.longitude;

    const confString = sessionStorage.getItem(CONFIG_NAME);

    if (confString) {
      try {
        this.config = JSON.parse(confString);
        console.log('config recuperado', this.config);
        this.obtenerConfiguracion();
      } catch (error) {
        console.error('Error al analizar la configuración:', error);
      }
    }

    this.obtenerDatos();
  }

  encender1(val: any) {
    console.log('encender', val);
    this.dispositivo.encendido1 = val;
    this.dispositivo.accion = 'encendido1';
    this.cambiarEstado();
  }

  encender2(val: any) {
    console.log('encender', val);
    this.dispositivo.encendido2 = val;
    this.dispositivo.accion = 'encendido2';
    this.cambiarEstado();
  }

  encender3(val: any) {
    console.log('encender', val);
    this.dispositivo.encendido3 = val;
    this.dispositivo.accion = 'encendido3';
    this.cambiarEstado();
  }

  obtenerConfiguracion() {
    this.inicioService.getConfiguracion().subscribe(rs => {
      console.log("obtenerConfiguracion", rs);
      sessionStorage.setItem(CONFIG_NAME, JSON.stringify(rs));
    });
  }

  obtenerDatos() {
    this.inicioService.recuperarEstadoAlarmaComunitaria().subscribe(datos => {
      this.dispositivo = datos.alarma;
      this.imagenes.sosiconoactual = this.dispositivo.encendido3 ? this.imagenes.soson : this.imagenes.sosoff;
      this.imagenes.roboiconoactual = this.dispositivo.encendido1 ? this.imagenes.roboon : this.imagenes.robooff;
      this.imagenes.fuegoiconoactual = this.dispositivo.encendido2 ? this.imagenes.fuegoon : this.imagenes.fuegooff;
    });
  }

  cambiarEstado() {
    this.inicioService.smartboxactionalarma(this.dispositivo).subscribe(rs => {
      console.log("smartboxactionalarma", rs);
      if (rs.estado === "OK") {
        this.obtenerDatos();
        this.openSnackBar(rs.mensaje || 'Dispositivo actualizado', rs.titulo || 'Correcto');
      } else {
        this.openSnackBar(rs.mensaje || 'Error al Actualizar el estado', rs.titulo || 'Error');
      }
    });
  }


  startPressTimer(accionboton: any) {
    // Start the timer when a button is pressed.
    this.progress = 1;
    this.timerId = setTimeout(() => {
      console.log('Button pressed for 2 seconds');

      if (accionboton == 'robo') {
        this.encender1(this.dispositivo.encendido1 == 1 ? 0 : 1);
      }

      if (accionboton == 'incendio') {
        this.encender2(this.dispositivo.encendido2 == 1 ? 0 : 1);
      }

      if (accionboton == 'medica') {
        this.encender3(this.dispositivo.encendido3 == 1 ? 0 : 1);
      }

    }, this.duration);
    // Update the progress.
    this.updateProgress();
  }

  stopPressTimer() {
    // Stop the timer if the button is released before 2 seconds.
    clearTimeout(this.timerId);
    // Reset the progress.
    this.progress = 0;
  }

  updateProgress() {
    // Update the progress while the button is pressed.
    if (this.progress > 0 && this.progress < 100) {
      this.progress += 1;
      setTimeout(() => this.updateProgress(), this.duration / 100);
    }
  }

  abrirDispositivos() {
    this.router.navigateByUrl('/dispositivos');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000
    });
  }
}
