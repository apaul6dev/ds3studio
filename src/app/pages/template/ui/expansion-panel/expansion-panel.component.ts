import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html'
})
export class ExpansionPanelComponent {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  public step = 0;
  public settings: Settings;
  constructor(public appSettings:AppSettings) {
    this.settings = this.appSettings.settings; 
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