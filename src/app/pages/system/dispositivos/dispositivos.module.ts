import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { DispositivosComponent } from './dispositivos.component';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from 'src/app/theme/pipes/pipes.module';
import { CercoComponentc } from './cerco/cerco.component';


export const routes: Routes = [
    { path: '', component: DispositivosComponent, pathMatch: 'full' }
  ];
  
  @NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        //InMemoryWebApiModule.forRoot(UsersData, { delay: 500 }),
        NgxPaginationModule,
        SharedModule,
        PipesModule    
    ],
    declarations: [
      DispositivosComponent, CercoComponentc
    ] 
  })
  export class DispositivosModule { }