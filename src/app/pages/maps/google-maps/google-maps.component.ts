import { Component } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html'
})
export class GoogleMapsComponent {
  settings: Settings; 
  center: google.maps.LatLngLiteral = { lat: 45.421530, lng: -75.697193 };
  zoom = 7;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [
    { lat: 45.421530, lng: -75.697193 }
  ];
  constructor(public appSettings:AppSettings) { 
    this.settings = this.appSettings.settings; 
  }
}