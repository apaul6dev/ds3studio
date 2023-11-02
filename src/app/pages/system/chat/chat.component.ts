import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { Chat } from './chat.model';
import { ChatService } from './chat.service';
import { ChatMessageServer } from './chat-model';
import { DATA_USER } from 'src/app/shared/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SoundPlayService } from 'src/app/shared/play-sound.service';
import { ChatUpdateService } from './chat-update.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit {

  @ViewChild('sidenav') sidenav: any;
  public settings: Settings;
  public userImage = 'assets/img/users/default-user.jpg';
  public chats: Array<Chat> = [];
  public talks: Array<Chat> = [];
  public sidenavOpen: boolean = false;
  public currentChat: Chat;
  public newMessage: string;

  public moreMessages = false;

  public user = {
    name: "",
    lastname: ""
  };

  constructor(
    public appSettings: AppSettings,
    private chatService: ChatService,
    private chatUpdateService: ChatUpdateService,
    public snackBar: MatSnackBar,
  ) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.chatUpdateService.datosCambio.subscribe(rs => {
      this.refrescarUltimosMensajes();
    });

    const tmpUser = sessionStorage.getItem(DATA_USER);
    if (tmpUser) {
      const dataUser = JSON.parse(tmpUser);
      this.user.name = dataUser.name;
      this.user.lastname = dataUser.lastname;
    }

    this.chats = this.chatService.getChats();

    this.getChat(this.chats[0]);

    this.chatService.datosCambio.subscribe(rs => {
      console.log("Sending data. ", rs);
      const newMsg: any = {
        nombres: rs.author,
        avatar: 'assets/img/profile/comunidad.png',
        fcreacion: Date.now(),
        texto: rs.text,
        estado: 'pending',
        yo: true,
        tracker: Math.random().toString(36).substring(2),
      };
      this.chatService.sendMesg(newMsg).subscribe(rs => {
        console.log('sendMsg', rs);
      });
    });

    if (window.innerWidth <= 768) {
      this.sidenavOpen = false;
    }
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    this.sidenavOpen = window.innerWidth <= 768;
  }

  pagina = 1;
  loadMoreMessages() {
    this.chatService.getMensajes({ id: null, pagina: this.pagina += 1 }).subscribe(rs => {
      if (rs.estado && rs.estado == 'OK') {
        const listaTmp: ChatMessageServer[] = rs.data;
        if (listaTmp.length > 0) {
          listaTmp.forEach(ms => {
            const tmp = new Chat(
              'assets/img/profile/comunidad.png',
              ms.nombres,
              'Pendiente',
              ms.texto,
              new Date(ms.fcreacion),
              true
            );
            this.talks.unshift(tmp);
          });
        } else {
          this.pagina -= 1;
          console.log(this.pagina);
          this.openSnackBar("No more messages available", "OK");
        }
      }
    });
  }

  public getChat(obj: any) {
    if (this.talks) {
      this.talks.length = 0;
      this.pagina = 1;
    }

    this.chatService.getMensajes({ id: null, pagina: 1 }).subscribe(rs => {
      if (rs.estado && rs.estado == 'OK') {
        this.moreMessages = true;
        this.talks.push(obj);
        const listaTmp: ChatMessageServer[] = rs.data;
        listaTmp.forEach(ms => {
          const tmp = this.getChatObj(ms);
          this.talks.unshift(tmp);
        });

        this.currentChat = obj;
        this.talks.forEach(talk => {
          if (!talk.my) {
            talk.image = obj.image;
          }
        });
      }
    });

    if (window.innerWidth <= 768) {
      this.sidenav.close();
    }
  }

  public sendMessage($event: any) {
    if (($event.which === 1 || $event.which === 13) && this.newMessage.trim() != '') {
      if (this.talks) {
        const msg = new Chat(
          'assets/img/users/default-user.jpg',
          `${this.user.name} ${this.user.lastname}`,
          'online',
          this.newMessage,
          new Date(),
          true
        );

        this.newMessage = '';
        this.chatService.datosCambio.next(msg);
        let chatContainer = document.querySelector('.chat-content');
        if (chatContainer) {
          setTimeout(() => {
            var nodes = chatContainer!.querySelectorAll('.mat-mdc-list-item');
            let newChatTextHeight = nodes[nodes.length - 1];
            chatContainer!.scrollTop = chatContainer!.scrollHeight + newChatTextHeight.clientHeight;
          });
        }
      }
    }
  }

  public ngOnDestroy() {
    if (this.talks) {
      this.talks.length = 2;
    }
  }


  getChatObj(ms: any) {
    return new Chat(
      'assets/img/profile/comunidad.png',
      ms.nombres,
      'Pendiente',
      ms.texto,
      new Date(ms.fcreacion),
      true
    );
  }

  refrescarUltimosMensajes() {
    const solicitud: any = {
      id: null,
      pagina: 1,
    };
    this.chatService.refrescarUltimosMensajes(solicitud).subscribe(rs => {
      //console.log('refrescarUltimosMensajes', rs);
      if (rs.estado === 'OK') {
        const mensajes = rs.data;
        //console.log('mensajes: ', mensajes);
        if (mensajes.length > 0) {
          const lastMsg = mensajes[0];
          //console.log('last', lastMsg);
          let tmp = this.getChatObj(lastMsg);
          this.talks.push(tmp);
        } else {
          console.log('No messages available');
        }
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
