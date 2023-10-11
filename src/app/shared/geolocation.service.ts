import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class GelocationService {


    constructor() { }

    obtenerGeolocalizacion() {
        const coordenadas = { latitude: 0, longitude: 0 }
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                coordenadas.latitude = latitude;
                coordenadas.longitude = longitude;
                console.log(`Latitud: ${latitude}, Longitud: ${longitude}`);
            }, (error) => {
                console.error("Error al obtener la geolocalización:", error);
            });
        } else {
            console.error("Geolocalización no está disponible en este navegador.");
        }
        return coordenadas;
    }


}