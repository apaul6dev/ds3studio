import { Injectable, OnInit } from "@angular/core";
import { Howl, Howler } from 'howler';

@Injectable({
    providedIn: 'root'
})
export class SoundPlayService implements OnInit {

    soundSmart = new Howl({
        src: ['assets/modosmart.mp3']
      });

      
      soundMessage = new Howl({
        src: ['assets/chat.mp3']
      });
    

    constructor() { 
        
    }

    ngOnInit(): void {

    }

    soundPlayModoSmart() {
       this.soundSmart.play()
    }

    soundPlayChat() {
        this.soundMessage.play()
    }

}