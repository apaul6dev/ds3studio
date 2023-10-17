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
    center: google.maps.LatLngLiteral = { lat: 45.421530, lng: -75.697193 };
    zoom = 7;
    markerOptions: google.maps.MarkerOptions = { draggable: false };
    markerPositions: google.maps.LatLngLiteral[] = [
      { lat: 45.421530, lng: -75.697193 }
    ];

    constructor(private mapDirectionsService: MapDirectionsService,
        private router: Router, public appSettings: AppSettings, private detalleNotificacionService: DetalleNotificacionService) {
        this.settings = this.appSettings.settings;

        this.notification = this.detalleNotificacionService.notification;
        console.log("recibiendo notificacion: ", this.notification);

        this.center.lat = this.notification.latitud;
        this.center.lng = this.notification.longitud;

    }



    ngOnInit() {
       //  this.calcularRuta();
    }


    calcularRuta() {
        // Define the origin and destination points
        const origin = { lat: 40.7128, lng: -74.0060 }; // Example: New York
        const destination = { lat: 34.0522, lng: -118.2437 }; // Example: Los Angeles

        // Configure the route options
        const routeOptions = {
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING, // You can use 'WALKING', 'BICYCLING', etc.
        };

        // Call MapDirectionsService to calculate the route
        this.mapDirectionsService.route(routeOptions)
            .subscribe((result) => {
                // 'result' contains information about the route
                console.log(result);
            }, (error) => {
                // Error handling
                console.error('Error calculating the route:', error);
            });
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