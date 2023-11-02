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
    this.dispositivosService.datosCambio.subscribe(rs => {
      this.obtenerDispositivos();
    });
    this.obtenerGeolocalizacion();
    this.obtenerDispositivos();
  }

  obtenerGeolocalizacion() {
    const geo = this.gelocationService.obtenerGeolocalizacion();
    this.coordenadas.latitud = geo.latitude;
    this.coordenadas.longitud = geo.longitude;
  }


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