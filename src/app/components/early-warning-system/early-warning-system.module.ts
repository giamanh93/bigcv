import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { EarlyWarningSystemRoutingModule } from './early-warning-system-routing.module';
import { EarlyWarningSystemComponent } from './early-warning-system.component';
import { HrmBreadCrumbModule } from 'src/app/common/hrm-breadcrumb/hrm-breadcrumb.module';
import {DividerModule} from 'primeng/divider';
import {TabViewModule} from 'primeng/tabview';
import { GroupWarningProductComponent } from './group-warning-product/group-warning-product.component';
import { GroupWarningCustomerComponent } from './group-warning-customer/group-warning-customer.component';
import { GroupWarningCounterComponent } from './group-warning-counter/group-warning-counter.component';
import { GroupWarningSupplierComponent } from './group-warning-supplier/group-warning-supplier.component';
import { EarlyWarningSystemService } from 'src/app/services/earlyWarningSystem.service';
import {MessageModule} from 'primeng/message';
import {DropdownModule} from 'primeng/dropdown';
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
        EarlyWarningSystemRoutingModule,
        HrmBreadCrumbModule,
        DividerModule,
        TabViewModule,
        MessageModule,
        DropdownModule
    ],
    providers: [
        EarlyWarningSystemService,
    ],
    declarations: [EarlyWarningSystemComponent, GroupWarningProductComponent, GroupWarningCustomerComponent, GroupWarningCounterComponent, GroupWarningSupplierComponent]
})
export class EarlyWarningSystemModule { }
