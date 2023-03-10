import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FinancialControlSystemComponent } from './financial-control-system.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: FinancialControlSystemComponent }
    ])],
    exports: [RouterModule]
})
export class FinancialControlSystemRoutingModule { }
