import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './containers/default-layout';
@NgModule({
  imports: [
      RouterModule.forRoot([
          {
            path: '',
            redirectTo: 'early-warning-system',
            pathMatch: 'full',
          },
          {
              path: '', component: DefaultLayoutComponent,
              children: [
                { path: '', loadChildren: () => import('../app/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                { path: 'customer-management-system', loadChildren: () => import('../app/components/customer-management-system/customer-management-system.module').then(m => m.CustomerManagementSystemModule) },
                { path: 'early-warning-system', loadChildren: () => import('../app/components/early-warning-system/early-warning-system.module').then(m => m.EarlyWarningSystemModule) },
                { path: 'control-system', loadChildren: () => import('../app/components/control-system/control-system.module').then(m => m.ControlSystemModule) },
                { path: 'financial-control-system', loadChildren: () => import('../app/components/financial-control-system/financial-control-system.module').then(m => m.FinancialControlSystemModule) },
                { path: 'supplier-management-system', loadChildren: () => import('../app/components/supplier-management-system/supplier-management-system.module').then(m => m.SupplierManagementSystemModule) },
                  
              ]
          },
          // { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
          // { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
          // { path: 'notfound', component: NotfoundComponent },
          // { path: '**', redirectTo: '/notfound' },
      ])
      // ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
