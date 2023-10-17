import { Component, OnInit, ViewChild } from "@angular/core";
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
  imagenes = IMAGENES;

  progress: number = 0;
  timerId: any;
  duration: number = 2000;

  public settings: Settings;
  constructor(public appSettings: AppSettings, public snackBar: MatSnackBar, private gelocationService: GelocationService, private router: Router, private inicioService: InicioService) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
    this.getConfigAppStart();
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


    /*
    this.configLoaded = true;

    this.obtenerDatos();

    this.storage
      .get('config')
      .then((a) => {


        if (a) {
          this.config = a;
        }

      })
      .finally(() => {
        console.log('Finally');

        this.obtenerConfiguracion();
      });

    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.coordenadas.latitud = resp.coords.latitude;
        this.coordenadas.longitud = resp.coords.longitude;
        console.log(resp);
      })
      .catch((error) => {
        console.log('Error getting location', error);
      }); */

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

    /*
    this.authHttp.post(
      '/userapp/getConfigApp/',
      null,
      (datos) => {
        console.log(datos);

        if (datos) {
          this.config = datos;
          this.storage.set('config', this.config);
        }
        this.zone.run(() => {
          console.log('force update the screen');
        });
      },
      (error) => {
        console.log('Error' + error);
        this.utilitarios.mostrarToast(
          'No se pudo conectar',
          'Verifique su conexión al servidor',
          false
        );
      }
    ); */
  }

  obtenerDatos() {

    this.inicioService.recuperarEstadoAlarmaComunitaria().subscribe(rs => {
      console.log("recuperarEstadoAlarmaComunitaria", rs);

    });

    /*
    this.authHttp.post(
      '/controlDispositivos/recuperarEstadoAlarmaComunitaria/',
      null,
      (datos) => {
        console.log(datos);

        if (this.utilitarios.handleError(datos)) {
          console.log('Error');
          return;
        }

        if (datos.alarma) {
          this.zone.run(() => {
            this.dispositivo = datos.alarma;

            this.sosiconoactual = this.dispositivo.encendido3 ? this.soson : this.sosoff;

            this.roboiconoactual = this.dispositivo.encendido1 ? this.roboon : this.robooff;

            this.fuegoiconoactual = this.dispositivo.encendido2 ? this.fuegoon : this.fuegooff;

            console.log('update on estado...');
          });
        }
      },
      (error) => {
        console.log('Error' + error);
        if (this.utilitarios.handleError(null)) {
          console.log('Error');
          return;
        }
      }
    ); */
  }


  cambiarEstado() {
    this.inicioService.smartboxactionalarma(this.dispositivo).subscribe(rs => {
      console.log("smartboxactionalarma", rs);
      this.openSnackBar(rs.mensaje || 'Dispositivo actualizado', rs.titulo || 'Correcto');
    });

    /*
    this.dispositivo.latitud = this.coordenadas.latitud;
    this.dispositivo.longitud = this.coordenadas.longitud;
    this.authHttp.post(
      '/controlDispositivos/smartboxactionalarma/',

      this.dispositivo,
      (datos) => {
        if (this.utilitarios.handleError(datos)) {
          console.log('Error');
          return;
        }

        this.utilitarios.mostrarToast(
          datos.titulo || 'Correcto',
          datos.mensaje || 'Dispositivo actualizado',
          false
        );

        console.log(datos);
      },
      (error) => {
        console.log('Error' + error);
        if (this.utilitarios.handleError(null)) {
          console.log('Error');
          return;
        }
      }
    ); */
  }


  abrirCamaras() {
    /*
    const options: AppLauncherOptions = {};
    let urlTienda = 'market://details?id=com.connect.enduser&hl=es_EC';
    if (this.platform.is('ios')) {
      options.uri =
        'itms-apps://apps.apple.com/ec/app/hik-connect/id1087803190';
      urlTienda = 'https://apps.apple.com/ec/app/hik-connect/id1087803190';
    } else {
      options.packageName = 'com.connect.enduser';
    }

    this.appLauncher
      .canLaunch(options)
      .then((canLaunch: boolean) => {
        console.log('App is available');
        if (canLaunch) {
          this.appLauncher.launch(options);
        } else {
          window.open(urlTienda, '_system');
        }
      })
      .catch((error: any) => {
        console.error(error);
        window.open(urlTienda, '_system');
      }); */
  }


  presionar(accionboton: string) {
    /*
    if (!accionboton) {
      return;
    }
    if (this.isloading) {
      return;
    }

    this.dispositivo.presionado = accionboton;

    this.startupload(accionboton); */
  }

  soltar(accionboton: any) {
    /*
    if (!accionboton) {
      return;
    }

    if (!accionboton) {
      return;
    }

    if (accionboton == 'medica') {
      this.sosiconoactual = this.dispositivo.encendido3 ? this.soson : this.sosoff;
    }

    if (accionboton == 'robo') {
      this.roboiconoactual = this.dispositivo.encendido1 ? this.roboon : this.robooff;
    }

    if (accionboton == 'incendio') {
      this.fuegoiconoactual = this.dispositivo.encendido2 ? this.fuegoon : this.fuegooff;
    }

    this.isloading = false;
    this.loadProgress = 0;
    this.dispositivo.presionado = null;

    if (this.timer) {
      clearInterval(this.timer);
    }
    */
  }

  startupload(accionboton: string) {
    /*
    if (this.isloading) {
      return;
    }

    if (accionboton == 'medica') {
      this.sosiconoactual = this.dispositivo.encendido3 ? this.sosofftooff : this.sosofftoon;
    }

    if (accionboton == 'robo') {
      this.roboiconoactual = this.dispositivo.encendido1 ? this.roboofftooff : this.roboofftoon;
    }

    if (accionboton == 'incendio') {
      this.fuegoiconoactual = this.dispositivo.encendido2 ? this.fuegoofftooff : this.fuegoofftoon;
    }

    if (this.timer) {
      clearInterval(this.timer);
    }
    this.isloading = true;
    this.loadProgress = 0;
    console.log('Iniciando contador');
    this.timer = setInterval(() => {
      const enviar = accionboton;
      if (!this.isloading) {
        clearInterval(this.timer);
        this.loadProgress = 0;
        this.dispositivo.presionado = null;
        return;
      }
      if (this.loadProgress < 1.30) {
        this.loadProgress += 0.01;
      }
      if (this.loadProgress >= 1.30) {


        clearInterval(this.timer);
        this.isloading = false;
        this.dispositivo.presionado = null;
        if (accionboton == 'robo') {
          this.encender1(this.dispositivo.encendido1 == 1 ? 0 : 1);
        }

        if (accionboton == 'incendio') {
          this.encender2(this.dispositivo.encendido2 == 1 ? 0 : 1);
        }

        if (accionboton == 'medica') {
          this.encender3(this.dispositivo.encendido3 == 1 ? 0 : 1);
        }

        this.loadProgress = 0;
      }
    }, 20); */
  }
  /*
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopsubmenuComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
    });
    await popover.present();
  } */

  

  abrirDispositivos() {
    this.router.navigateByUrl('/dispositivos');
  }

  //--------------------------------------------------------------------------------------------------

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000
    });
  }

  startPressTimer(accionboton:any) {
    // Reiniciar el progreso
    this.progress = 1;
    this.timerId = setTimeout(() => {
      console.log('Botón presionado por 2 segundos completos');

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


