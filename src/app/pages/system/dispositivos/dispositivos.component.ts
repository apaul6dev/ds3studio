import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { ThemePalette } from "@angular/material/core";
import { AppSettings } from "src/app/app.settings";
import { Settings } from "src/app/app.settings.model";

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
  ];

  public settings: Settings;

  constructor(public appSettings: AppSettings) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {

  }

  toggleState(chip: any): void {
    chip.state = !chip.state; 
    if (chip.state) {
      this.chips.forEach(otherChip => {
        if (otherChip !== chip) {
          otherChip.state = false;
        }
      });
    }
  }

}