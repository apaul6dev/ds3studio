import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatAccordion } from "@angular/material/expansion";
import { AppSettings } from "src/app/app.settings";
import { Settings } from "src/app/app.settings.model";
import { Comunidad } from "../model/comunidad";
import { ComunidadService } from "./comunidad.service";

@Component({
  selector: 'app-comunidad',
  templateUrl: './comunidad.component.html',
  styleUrls: ['./comunidad.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: []
})
export class ComunidadComponent implements OnInit {

  items: Comunidad[] = [];

  @ViewChild(MatAccordion) accordion: MatAccordion;
  public step = 0;
  public settings: Settings;
  constructor(public appSettings: AppSettings, private comunidadService: ComunidadService) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
    this.items.push({
      nombres: 'ECU 911',
      apellidos: '',
      celular: '911',
      telefono: '',
      descripcion: 'Servicio Integrado de Seguridad ECU 911',
      sos: true,
      id: -1,
    });
    this.getComunidad();
  }

  getComunidad() {
    this.comunidadService.listar().subscribe(rs => {
      console.log(rs);
      if (rs.estado && rs.estado === 'OK') {
        rs.data.forEach((e: Comunidad) => {
          this.items.push(e);
        });
      } else {
        console.log("no se ha resuleto el origen de los datos");
      }
    }
    );
  }

  llamar() {

  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}