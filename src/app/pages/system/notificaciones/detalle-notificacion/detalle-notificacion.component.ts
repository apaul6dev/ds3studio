import { Component, OnInit } from "@angular/core";
import { DetalleNotificacionService } from './detalle-notificacion.service';
import { Router } from "@angular/router";
import { Settings } from "src/app/app.settings.model";
import { AppSettings } from "src/app/app.settings";
import { MapDirectionsService } from '@angular/google-maps';
import { Observable } from "rxjs";

@Component({
    selector: 'app-detalle-notificacion',
    templateUrl: './detalle-notificacion.component.html',
    styleUrls: ['./detalle-notificacion.component.scss']
})
export class DetalleNotificacionComponent implements OnInit {
    notification: any;

    settings: Settings;
    /*
        center: google.maps.LatLngLiteral = { lat: 45.421530, lng: -75.697193 };
        //zoom = 7;
    
        //markerOptions: google.maps.MarkerOptions = { draggable: false };
        
        markerPositions: google.maps.LatLngLiteral[] = [
            { lat: 45.421530, lng: -75.697193 }
        ]; 
    
    
        //center: google.maps.LatLngLiteral = { lat: 40.7128, lng: -74.0060 }; // Reemplaza con tu ubicación central
        zoom = 5;
      
        miUbicacion: google.maps.LatLngLiteral = { lat: 40.7128, lng: -74.0060 }; // Reemplaza con tu ubicación actual
        puntoDeLlegada: google.maps.LatLngLiteral = { lat: 40.7530, lng: -73.9835 }; // Reemplaza con tu punto de llegada
      
        markerOptions: google.maps.MarkerOptions = {
          animation: google.maps.Animation.DROP,
        };
      
        polylineOptions: google.maps.PolylineOptions = {
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2,
        };
      
        ruta: google.maps.LatLngLiteral[] = [this.miUbicacion, this.puntoDeLlegada]; */

    center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
    zoom = 4;

    readonly directionsResults$: Observable<google.maps.DirectionsResult | undefined | any>;

    constructor(mapDirectionsService: MapDirectionsService,
        private router: Router, public appSettings: AppSettings, private detalleNotificacionService: DetalleNotificacionService) {
        this.settings = this.appSettings.settings;

        this.notification = this.detalleNotificacionService.notification;
        console.log("recibiendo notificacion: ", this.notification);
        this.center.lat = this.notification.latitud;
        this.center.lng = this.notification.longitud;

        const request: google.maps.DirectionsRequest = {
            destination: { lat: 12, lng: 4 },
            origin: { lat: 14, lng: 8 },
            travelMode: google.maps.TravelMode.DRIVING
        };

        /*
        this.directionsResults$ = mapDirectionsService.route(request).pipe(
            map((response: any) => response.result)
        ); */
    }



    ngOnInit() {

    }








    shareOnGoogleMaps(lat: any, lng: any): void {
        const url = `https://www.google.com/maps?q=${lat},${lng}`;
        window.open(url, '_blank');
    }

    atras() {
        this.router.navigate(['/notificaciones']);
    }
}


export interface MapDirectionsResponse {
    status: google.maps.DirectionsStatus;
    result?: google.maps.DirectionsResult;
}