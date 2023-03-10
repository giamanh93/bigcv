import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerManagementSystemComponent } from './customer-management-system.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: CustomerManagementSystemComponent }
    ])],
    exports: [RouterModule]
})
export class CustomerManagementSystemRoutingModule { }
