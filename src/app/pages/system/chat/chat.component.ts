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
  }

  constructor(public appSettings: AppSettings, private chatService: ChatService, private chatUpdateService: ChatUpdateService,
    public snackBar: MatSnackBar, private soundPlayService: SoundPlayService) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.chatUpdateService.datosCambio.subscribe(rs => {
      //this.soundPlayService.soundPlayChat();
      console.log('refrescando mensajes', rs);
      this.refrescarUltimosMensajes();
    });

    const tmpUser = sessionStorage.getItem(DATA_USER)
    if (tmpUser) {
      let dataUser = JSON.parse(tmpUser);
      this.user.name = dataUser.name;
      this.user.lastname = dataUser.lastname;
    }

    this.chats = this.chatService.getChats();

    this.getChat(this.chats[0]);

    this.chatService.datosCambio.subscribe(
      rs => {
        console.log("enviado datos. ", rs);
        let newMsg: any = {
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
      }
    );

    if (window.innerWidth <= 768) {
      this.sidenavOpen = false;
    }

  }


  @HostListener('window:resize')
  public onWindowResize(): void {
    (window.innerWidth <= 768) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }

  pagina = 1;
  loadMoreMessages() {
    this.chatService.getMensajes({ id: null, pagina: this.pagina += 1 }).subscribe(rs => {
      if (rs.estado && rs.estado == 'OK') {
        const listaTmp: ChatMessageServer[] = rs.data;
        if (listaTmp.length > 0) {
          listaTmp.forEach(ms => {
            let tmp = new Chat(
              'assets/img/profile/comunidad.png',
              ms.nombres,
              'Pendiente',
              ms.texto, new Date(ms.fcreacion), true)
            this.talks.unshift(tmp);
          });
        } else {
          this.pagina -= 1;
          console.log(this.pagina);
          this.openSnackBar("No existe más mensajes", "OK");
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
          let tmp = this.getChatObj(ms) ;
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
          true);

        //this.talks.push(msg);
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
    if (this.talks)
      this.talks.length = 2;
  }


  getMensajeTemplate() {

  }

  getChatObj(ms:any) {
    let tmp = new Chat(
      'assets/img/profile/comunidad.png',
      ms.nombres,
      'Pendiente',
      ms.texto, new Date(ms.fcreacion), true);
    return tmp;
  }

  refrescarUltimosMensajes() {
    const solicitud: any = {
      id: null,
      pagina: 1,
    };
    this.chatService.refrescarUltimosMensajes(solicitud).subscribe(rs => {
      console.log('refrescarUltimosMensajes', rs);
      if (rs.estado === 'OK') {

        const mensajes = rs.data;
        console.log('mensajes: ', mensajes);
        
        if (mensajes.length > 0) {
          const lastMsg = mensajes[0];
          console.log('last', lastMsg);
          
          let tmp = this.getChatObj(lastMsg);
          //tmp.image = this.currentChat.image;
          this.talks.push(tmp);
        } else {
          console.log('No hay mensajes');
        }
      }
    });

    /*
    const solicitud: QueryModel = {
      id: null,
      pagina: 1,
    };

    this.authHttp.post(
      this.urlListaMensajes,
      solicitud,
      (respuesta) => {
        if (this.utilitarios.handleError(respuesta)) {
          return;
        }

        if (!respuesta.data) {
          return;
        }

        let datos = respuesta.data;

        this.utilitarios.ordernarLista(datos, 'cmensaje', 'asc');

        datos.forEach((element) => {
          if (element.yo && element.cusuario) {
            this.nombres = element.nombres;
            this.cusuario = element.cusuario;
          }

          this.addMessageToList(element);
        });

        this.utilitarios.ordernarLista(this.msgList, 'cmensaje', 'desc');

        if (this.msgList.length > 0) {
          this.utilitarios.guardarListaDatosEnStorage('mensajes', this.msgList);
        }

        this.scrollToBottom();
        this.zone.run(() => {
          console.log('force update the screen');
        });
      },
      (error) => {
        console.log('Error:' + error);
      }
    ); */
  }

  getMensajes() {
    const solicitud: any = {
      id: null,
      pagina: 1,
    };

    this.chatService.getMensajes(solicitud).subscribe(rs => {
      console.log('getMensajes', rs);

    });

    /*
    const solicitud: QueryModel = {
      id: null,
      pagina: this.pagina,
    };

    this.authHttp.post(
      this.urlListaMensajes,
      solicitud,
      (respuesta) => {
        this.inicializado = true;
        this.exito = true;
        if (this.utilitarios.handleError(respuesta)) {
          return;
        }

        if (!respuesta.data) {
          return;
        }

        let datos = respuesta.data;

        datos.forEach((element) => {
          if (element.yo && element.cusuario) {
            this.nombres = element.nombres;
            this.cusuario = element.cusuario;
          }

          element.relativetime = this.utilitarios.dateTransformToRelativeTime(
            element.fcreacion
          );
        });

        if (this.pagina > 1) {
          datos.forEach((item) => {
            this.addMessageToList(item);
          });
          this.pagina += 1;
        } else {
          console.log('priemra pagina....');

          datos.forEach((item) => {
            this.addMessageToList(item);
          });
          this.pagina += 1;
          this.scrollToBottom();
          setTimeout(() => {
            if (this.chao) {
              return;
            }
            if (this.infiniteScrollA) {
              this.infiniteScrollA.disabled = false;
            }
          }, 1000);

          //  this.animarInicio()
        }
        let count = Object.keys(datos).length;
        if (count === 0) {
          this.hayMasResultados = false;
        } else {
          this.hayMasResultados = true;
        }

        this.utilitarios.ordernarLista(this.msgList, 'cmensaje', 'desc');

        if (this.msgList.length > 0) {
          this.utilitarios.guardarListaDatosEnStorage('mensajes', this.msgList);
        }

        this.zone.run(() => {
          console.log('force update the screen');
        });
      },
      (error) => {
        this.exito = true;
        console.log('Error:' + error);
      }
    ); */
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

}