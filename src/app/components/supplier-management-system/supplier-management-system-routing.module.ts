import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SupplierManagementSystemComponent } from './supplier-management-system.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: SupplierManagementSystemComponent }
    ])],
    exports: [RouterModule]
})
export class SupplierManagementSystemRoutingModule { }
