import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from 'src/app/pages/login/login.service';
import { DATA_USER } from 'src/app/shared/constants';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserMenuComponent implements OnInit {

  public userImage = 'assets/img/users/default-user.jpg';

  public user = {
    name: '', lastname: ''
  }

  constructor() { }

  ngOnInit() {
    const tmpUser = sessionStorage.getItem(DATA_USER)
    if (tmpUser) {
      let dataUser = JSON.parse(tmpUser);
      this.user.name = dataUser.name;
      this.user.lastname = dataUser.lastname;
      //console.log('Recuperado:', dataUser);
    }
  }

}
