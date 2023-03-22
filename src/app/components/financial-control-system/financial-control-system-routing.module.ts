import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FinancialControlSystemComponent } from './financial-control-system.component';
import { ReviewRevenueWithFlowOfMoneyComponent } from './review-revenue-with-flow-of-money/review-revenue-with-flow-of-money.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ReviewRevenueWithFlowOfMoneyComponent },
        { path: 'review-revenue-with-flow-of-money', component: ReviewRevenueWithFlowOfMoneyComponent },
    ])],
    exports: [RouterModule]
})
export class FinancialControlSystemRoutingModule { }
