import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { FinancialControlSystemRoutingModule } from './financial-control-system-routing.module';
import { FinancialControlSystemComponent } from './financial-control-system.component';
import { HrmBreadCrumbModule } from 'src/app/common/components/hrm-breadcrumb/hrm-breadcrumb.module';
import { ReviewRevenueWithFlowOfMoneyComponent } from './review-revenue-with-flow-of-money/review-revenue-with-flow-of-money.component';
import { DividerModule } from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';
import { MessageModule } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { LoadingGridModule } from 'src/app/common/components/loading-grid/loading-grid.module';
import { SkeletonModule } from 'primeng/skeleton';
import { PaginatorModule } from 'primeng/paginator';
import { ToolbarModule } from 'primeng/toolbar';
import { ListGridAngularModule } from 'src/app/common/components/list-grid-angular/list-grid-angular.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        HrmBreadCrumbModule,
        DividerModule,
        TabViewModule,
        MessageModule,
        DropdownModule,
        LoadingGridModule,
        SkeletonModule,
        PaginatorModule,
        ToolbarModule,
        ListGridAngularModule,
    ],
    declarations: [FinancialControlSystemComponent, ReviewRevenueWithFlowOfMoneyComponent]
})
export class FinancialControlSystemModule { }
