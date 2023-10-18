import { Component, OnInit } from "@angular/core";
import { DetalleNotificacionService } from './detalle-notificacion.service';
import { Router } from "@angular/router";
import { Settings } from "src/app/app.settings.model";
import { AppSettings } from "src/app/app.settings";

@Component({
    selector: 'app-detalle-notificacion',
    templateUrl: './detalle-notificacion.component.html',
    styleUrls: ['./detalle-notificacion.component.scss']
})
export class DetalleNotificacionComponent implements OnInit {
    notification: any;

    settings: Settings;
    center: google.maps.LatLngLiteral = { lat: 45.421530, lng: -75.697193 };
    zoom = 12;
    markerOptions: google.maps.MarkerOptions = { draggable: false };
    markerPositions: google.maps.LatLngLiteral[] = [
        { lat: 45.421530, lng: -75.697193 }
    ];

    constructor(
        private router: Router, public appSettings: AppSettings, private detalleNotificacionService: DetalleNotificacionService) {
        this.settings = this.appSettings.settings;

        this.notification = this.detalleNotificacionService.notification;
        
        console.log("recibiendo notificacion: ", this.notification);

        this.center.lat = this.notification.latitud;
        this.center.lng = this.notification.longitud;

        this.markerPositions[0].lat = this.notification.latitud;
        this.markerPositions[0].lng = this.notification.longitud;

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