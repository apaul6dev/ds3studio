import { Injectable, OnInit } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class SoundPlayService implements OnInit {

    constructor() { }

    ngOnInit(): void {

    }

    soundPlayModoSmart() {
        const audio = new Audio('assets/modosmart.mp3');
        audio.play();
    }

    soundPlayChat() {
        const audio = new Audio('assets/chat.mp3');
        audio.play();
    }

}