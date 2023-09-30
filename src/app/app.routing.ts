import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { PagesComponent } from './pages/pages.component';
import { BlankComponent } from './pages/template/blank/blank.component';
import { SearchComponent } from './pages/template/search/search.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ErrorComponent } from './pages/errors/error/error.component';

export const routes: Routes = [
    {
        path: '',
        component: PagesComponent, children: [
            /*
            { path: '', loadChildren: () => import('./pages/template/dashboard/dashboard.module').then(m => m.DashboardModule), data: { breadcrumb: 'Dashboard' } },
            { path: 'users', loadChildren: () => import('./pages/template/users/users.module').then(m => m.UsersModule), data: { breadcrumb: 'Users' } },
            { path: 'ui', loadChildren: () => import('./pages/template/ui/ui.module').then(m => m.UiModule), data: { breadcrumb: 'UI' } },
            { path: 'form-controls', loadChildren: () => import('./pages/template/form-controls/form-controls.module').then(m => m.FormControlsModule), data: { breadcrumb: 'Form Controls' } },
            { path: 'tables', loadChildren: () => import('./pages/template/tables/tables.module').then(m => m.TablesModule), data: { breadcrumb: 'Tables' } },
            { path: 'icons', loadChildren: () => import('./pages/template/icons/icons.module').then(m => m.IconsModule), data: { breadcrumb: 'Material Icons' } },
            { path: 'drag-drop', loadChildren: () => import('./pages/template/drag-drop/drag-drop.module').then(m => m.DragDropModule), data: { breadcrumb: 'Drag & Drop' } },
            { path: 'schedule', loadChildren: () => import('./pages/template/schedule/schedule.module').then(m => m.ScheduleModule), data: { breadcrumb: 'Schedule' } },
            { path: 'mailbox', loadChildren: () => import('./pages/template/mailbox/mailbox.module').then(m => m.MailboxModule), data: { breadcrumb: 'Mailbox' } },
            { path: 'chat', loadChildren: () => import('./pages/template/chat/chat.module').then(m => m.ChatModule), data: { breadcrumb: 'Chat' } },
            { path: 'maps', loadChildren: () => import('./pages/template/maps/maps.module').then(m => m.MapsModule), data: { breadcrumb: 'Maps' } },
            { path: 'charts', loadChildren: () => import('./pages/template/charts/charts.module').then(m => m.ChartsModule), data: { breadcrumb: 'Charts' } },
            { path: 'dynamic-menu', loadChildren: () => import('./pages/template/dynamic-menu/dynamic-menu.module').then(m => m.DynamicMenuModule), data: { breadcrumb: 'Dynamic Menu' }  },          
            { path: 'profile', loadChildren: () => import ('./pages/template/profile/profile.module').then(m => m.ProfileModule), data: { breadcrumb: 'Profile' } }, 
            { path: 'blank', component: BlankComponent, data: { breadcrumb: 'Blank page' } },
            { path: 'search', component: SearchComponent, data: { breadcrumb: 'Search' } },
            */
            { path: '', loadChildren: () => import('./pages/system/inicio/inicio.module').then(m => m.InicioModule), data: { breadcrumb: 'Inicio' } },
            { path: 'dispositivos', loadChildren: () => import('./pages/system/dispositivos/dispositivos.module').then(m => m.DispositivosModule), data: { breadcrumb: 'Dispositivos' } },
            { path: 'notificaciones', loadChildren: () => import('./pages/system/notificaciones/notificaciones.module').then(m => m.NotificacionesModule), data: { breadcrumb: 'Notificaciones' } },
            { path: 'mensajes', loadChildren: () => import('./pages/system/mensajes/mensajes.module').then(m => m.MensajesModule), data: { breadcrumb: 'Mensajes' } },
            { path: 'comunidad', loadChildren: () => import('./pages/system/comunidad/comunidad.module').then(m => m.ComunidadModule), data: { breadcrumb: 'Comunidad' } },

        ]
    },
    
    { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
    { path: 'register', loadChildren: () => import('./pages/template/register/register.module').then(m => m.RegisterModule) },
    { path: 'error', component: ErrorComponent, data: { breadcrumb: 'Error' } },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }