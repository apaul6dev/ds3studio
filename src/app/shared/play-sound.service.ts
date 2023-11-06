import { Injectable } from "@angular/core";
import { Howl } from 'howler';

@Injectable({
    providedIn: 'root'
})
export class SoundPlayService {

    audioContext: AudioContext;
    private soundSmart: Howl;
    private soundMessage: Howl;

    constructor() {
        this.audioContext = new AudioContext();

        this.soundSmart = new Howl({
            src: ['assets/modosmart.mp3'],
            onplayerror: () => {
                console.error('Error al reproducir el sonido de ModoSmart');
            }
        });

        this.soundMessage = new Howl({
            src: ['assets/chat.mp3'],
            onplayerror: () => {
                console.error('Error al reproducir el sonido de chat');
            }
        });
    }

    soundPlayModoSmart() {
        this.audioContext.resume().then(() => {
            this.soundSmart.play();
        })
            .catch(error => {
                console.error('Error al iniciar el contexto de audio: ' + error.message);
            });
    }

    soundPlayChat() {
        this.audioContext.resume().then(() => {
            this.soundMessage.play();
        })
            .catch(error => {
                console.error('Error al iniciar el contexto de audio: ' + error.message);
            });
    }
}
