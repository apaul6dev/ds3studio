import { Component } from '@angular/core';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html'
})
export class ListsComponent {
  public settings: Settings;
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  constructor(public appSettings:AppSettings) {
    this.settings = this.appSettings.settings; 
  }
}