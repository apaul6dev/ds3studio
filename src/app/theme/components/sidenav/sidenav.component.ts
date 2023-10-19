import { Component, OnInit, ViewEncapsulation, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { MenuService } from '../menu/menu.service';
import { LoginService } from '../../../pages/login/login.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MenuService]
})
export class SidenavComponent implements OnInit {

  public userImage = '../assets/img/users/default-user.jpg';

  public user = {
    name: 'Nombre', lastname: 'Apellido'
  }

  public menuItems: Array<any>;
  public settings: Settings;

  constructor(public appSettings: AppSettings, public menuService: MenuService,
    private loginService: LoginService) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.menuItems = this.menuService.getVerticalMenuItems();
    this.loginService.datosCambio.subscribe(
      rs => {
        this.user.name = rs.nombres;
        this.user.lastname = rs.apellidos;
      }
    );
    console.log('Recuperado', this.user);
  }

  logout() {
    this.loginService.logout().subscribe(rs => {
      console.log("logout system: ", rs);
      sessionStorage.clear();
    });
  }

  public closeSubMenus() {
    let menu = document.getElementById("vertical-menu");
    if (menu) {
      for (let i = 0; i < menu.children[0].children.length; i++) {
        let child = menu.children[0].children[i];
        if (child) {
          if (child.children[0].classList.contains('expanded')) {
            child.children[0].classList.remove('expanded');
            child.children[1].classList.remove('show');
          }
        }
      }
    }
  }

}
