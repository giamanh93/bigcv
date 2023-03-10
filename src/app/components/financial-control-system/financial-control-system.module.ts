import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { FinancialControlSystemRoutingModule } from './financial-control-system-routing.module';
import { FinancialControlSystemComponent } from './financial-control-system.component';
import { HrmBreadCrumbModule } from 'src/app/common/components/hrm-breadcrumb/hrm-breadcrumb.module';

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
        FinancialControlSystemRoutingModule,
        HrmBreadCrumbModule
    ],
    declarations: [FinancialControlSystemComponent]
})
export class FinancialControlSystemModule { }
