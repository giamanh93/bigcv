import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ControlSystemComponent } from './control-system.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ControlSystemComponent }
    ])],
    exports: [RouterModule]
})
export class ControlSystemRoutingModule { }
