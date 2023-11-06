import { Injectable } from "@angular/core";
import { Howl } from 'howler';

@Injectable({
    providedIn: 'root'
})
export class SoundPlayService {

    private soundSmart: Howl;
    private soundMessage: Howl;

    constructor() {

        this.soundSmart = new Howl({
            src: ['assets/modosmart.mp3'],
            //html5: true,
            //autoplay: true,
            onplayerror: () => {
                console.error('Error al reproducir el sonido de ModoSmart');
            }
        });

        this.soundMessage = new Howl({
            src: ['assets/chat.mp3'],
            //html5: true,
            //autoplay: true,
            onplayerror: () => {
                console.error('Error al reproducir el sonido de chat');
            }
        });
    }

    soundPlayModoSmart() {
        this.soundSmart.play();
    }

    soundPlayChat() {
        this.soundMessage.play();
    }

}
