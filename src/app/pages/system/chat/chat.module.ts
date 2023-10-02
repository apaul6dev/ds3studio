import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChatComponent } from './chat.component';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from 'src/app/theme/pipes/pipes.module';
import { NgScrollbarModule } from 'ngx-scrollbar';


export const routes: Routes = [
    { path: '', component: ChatComponent, pathMatch: 'full' }
  ];
  
  @NgModule({
    imports: [
        HttpClientModule,
        PipesModule,  
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        NgScrollbarModule,
        SharedModule
    ],
    declarations: [
      ChatComponent, 
    ] 
  })
  export class ChatModule { }