import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CleanComponent } from '@app-backoffice/layouts/clean/clean.component';
import { DefaultComponent } from '@app-backoffice/layouts/default/default.component';
import { HomeComponent } from '@app-backoffice/pages/home/home.component';
import { PageNotFoundComponent } from '@app-backoffice/pages/page-not-found/page-not-found.component';
import { AuthGuard } from '@app-backoffice/services/auth.guard';
import { LoginComponent } from '@app-backoffice/pages/login/login.component';

const AppRoutes: Routes = [
    {// Layout CleanComponent
        path: '',
        component: DefaultComponent,
        children: [
            {
                path: '',
                component: HomeComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'home',
                component: HomeComponent,
                canActivate: [AuthGuard]
            }
        ]
    },
    {// Layout CleanComponent
        path: '',
        component: CleanComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            }
        ]
    },
    {// Layout NotFoundComponent
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(AppRoutes, {})],
    exports: [RouterModule]
})
export class AppRouting { }
