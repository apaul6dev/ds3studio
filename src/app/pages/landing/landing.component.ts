import { Component } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  public settings: Settings;
  constructor(public appSettings:AppSettings) {
    this.settings = this.appSettings.settings; 
  }

  ngOnInit(){
    this.settings.rtl = false;
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.settings.loadingSpinner = false; 
    });
  }

  public scrollToDemos(){
    setTimeout(() => { window.scrollTo(0,520) });
  }

  public changeLayout(menu: any, menuType: any, isRtl: boolean){
    this.settings.menu = menu;
    this.settings.menuType = menuType;
    this.settings.rtl = isRtl;
    this.settings.theme = 'indigo-light';
  }

  public changeTheme(theme: string){
    this.settings.theme = theme;       
  }

}
