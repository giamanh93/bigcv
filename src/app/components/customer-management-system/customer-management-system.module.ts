import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CustomerManagementSystemRoutingModule } from './customer-management-system-routing.module';
import { CustomerManagementSystemComponent } from './customer-management-system.component';
import { HrmBreadCrumbModule } from 'src/app/common/components/hrm-breadcrumb/hrm-breadcrumb.module';
import { FollowUpCustomerSalesProductComponent } from './follow-up-customer-sales-product/follow-up-customer-sales-product.component';
import { FollowUpCustomerCycleComponent } from './follow-up-customer-cycle/follow-up-customer-cycle.component';
import { FollowOrderValueComponent } from './follow-order-value/follow-order-value.component';
import { FollowFormShoppingComponent } from './follow-form-shopping/follow-form-shopping.component';
import { FollowUpCustomerSalesAreaComponent } from './follow-up-customer-sales-area/follow-up-customer-sales-area.component';
import { SkeletonModule } from 'primeng/skeleton';
import { DropdownModule } from 'primeng/dropdown';
import { customerManagementSystem } from 'src/app/services/customerManagementSystem.service';
import { PaginatorModule } from 'primeng/paginator';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        CustomerManagementSystemRoutingModule,
        HrmBreadCrumbModule,
        SkeletonModule,
        DropdownModule,
        PaginatorModule,
        ToolbarModule
    ],
    providers: [
        customerManagementSystem
    ],
    declarations: [CustomerManagementSystemComponent, FollowUpCustomerSalesProductComponent, FollowUpCustomerCycleComponent, FollowOrderValueComponent, FollowFormShoppingComponent, FollowUpCustomerSalesAreaComponent]
})
export class CustomerManagementSystemModule { }
