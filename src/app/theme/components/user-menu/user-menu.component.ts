import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from 'src/app/pages/login/login.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserMenuComponent implements OnInit {
  
  public userImage = './assets/img/users/default-user.jpg';

  public user = {
    name: 'Nombre', lastname: 'Apellido'
  }

  constructor( private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.datosCambio.subscribe(
      rs => {
        this.user.name = rs.nombres;
        this.user.lastname = rs.apellidos;
      }
    );
    console.log('Recuperado', this.user);
  }

}
