import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { ThemePalette } from "@angular/material/core";
import { AppSettings } from "src/app/app.settings";
import { Settings } from "src/app/app.settings.model";
import { DispositivosService } from "./dispositivos.service";

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

  constructor(public appSettings: AppSettings, private dispositivosService: DispositivosService) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
    this.obtenerGeolocalizacion();
  }


  obtenerGeolocalizacion() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.coordenadas.latitud = latitude;
        this.coordenadas.longitud = longitude;
        this.obtenerDispositivos();
        console.log(`Latitud: ${latitude}, Longitud: ${longitude}`);
      }, (error) => {
        console.error("Error al obtener la geolocalización:", error);
      });
    } else {
      console.error("Geolocalización no está disponible en este navegador.");
    }
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

}