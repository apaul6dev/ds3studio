import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { ThemePalette } from "@angular/material/core";
import { AppSettings } from "src/app/app.settings";
import { Settings } from "src/app/app.settings.model";
import { DispositivosService } from "./dispositivos.service";
import { GelocationService } from "src/app/shared/geolocation.service";

export interface ChipColor {
  name: string;
  color: ThemePalette;
}

@Component({
  selector: 'app-dispositivos',
  templateUrl: './dispositivos.component.html',
  styleUrls: ['./dispositivos.component.scss'],
})
export class DispositivosComponent implements OnInit {

  /*
  chips = [
    { label: '1', state: false },
    { label: '2', state: false },
    { label: '3', state: false },
    { label: '4', state: false },
    { label: '5', state: false },
    { label: '6', state: false },
    { label: '7', state: false },
    { label: '8', state: false },
    { label: '9', state: false },
    { label: '10', state: false }
  ]; */

  items: any = [];
  coordenadas = { latitud: 0, longitud: 0 };
  intervalo = null;

  public settings: Settings;

  constructor(public appSettings: AppSettings,
    private dispositivosService: DispositivosService,
    private gelocationService: GelocationService) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
    this.obtenerGeolocalizacion();
    this.obtenerDispositivos();
  }

  obtenerGeolocalizacion() {
    const geo = this.gelocationService.obtenerGeolocalizacion();
    this.coordenadas.latitud = geo.latitude;
    this.coordenadas.longitud = geo.longitude;
  }


  /*
  toggleState(chip: any): void {
    chip.state = !chip.state;
    if (chip.state) {
      this.chips.forEach(otherChip => {
        if (otherChip !== chip) {
          otherChip.state = false;
        }
      });
    }
  } */

  obtenerDispositivos() {
    this.dispositivosService.listar().subscribe(rs => {
      console.log(rs);
      if (rs.estado && rs.estado === 'OK') {
        //rs.lista.forEach((e: any) => {
        this.items = rs.lista;
        //});
      } else {
        console.log("no se ha resuelto el origen de los datos");
      }

    }
    );

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

}