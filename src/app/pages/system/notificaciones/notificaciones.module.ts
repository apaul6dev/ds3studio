import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { NotificacionesComponent } from './notificaciones.component';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from 'src/app/theme/pipes/pipes.module';
import { RelativeTimePipe } from './relative-time.pipe';
import { DetalleNotificacionComponent } from './detalle-notificacion/detalle-notificacion.component';
import { GoogleMapsModule } from '@angular/google-maps';

export const routes: Routes = [
  { path: '', component: NotificacionesComponent, pathMatch: 'full' },
  { path: 'detalleNotificacion', component: DetalleNotificacionComponent, data: { breadcrumb: 'detalle' }},
  //{ path: '**', component: NotificacionesComponent }
];

@NgModule({
  imports: [
    GoogleMapsModule,
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
    NotificacionesComponent, RelativeTimePipe,
    DetalleNotificacionComponent
  ]
})
export class NotificacionesModule { }