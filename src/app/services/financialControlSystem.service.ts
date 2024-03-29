import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Responses } from '../models/responses';
import { MessageService } from 'primeng/api';
import { ErrorService } from './error.service';

const baseUrl = 'https://api-ecofoods.bigcv.vn/api';

@Injectable({
    providedIn: 'root'
})
export class financialControlSystemService {
    private $http = inject(HttpClient);
    private $messageService = inject(MessageService);
    private $errorService = inject(ErrorService)

    getReviewRevenueWithFlowOfMoney(query: string): Observable<Responses> {
        return this.$http.get<Responses>(baseUrl + `/review/v1/getReviewRevenueWithFlowOfMoney?` + query).pipe(
            catchError(error => {
                this.handleError(error)
                return of(error.error);
            })
        );;

    }
    getReviewRevenueWithFlowOfMoneyDetail(query: string): Observable<Responses> {
        return this.$http.get<Responses>(baseUrl + `/review/v1/getReviewRevenueWithFlowOfMoneyDetail?` + query).pipe(
            catchError(error => {
                this.handleError(error)
                return of(error.error);
            })
        );;

    }

    getListBranch(query: string): Observable<Responses> {
        return this.$http.get<Responses>(baseUrl + `/branch/v1/getListBranch?` + query)
            .pipe(
                catchError(error => {
                    this.handleError(error)
                    return of(error.error);
                })
            );;
    }

    private handleError(error: any) {
        this.$errorService.setError(error.error);
        this.$messageService.add({ severity: 'error', summary: 'Error Message', detail: error.error });
    }













    

    private showError(err: any) {
        if (err) {
            if (err.error) {
                if (err.error.message) {
                    //   this.talert.showError(err.error.message);
                }
                else {
                    //   this.talert.showError(err.statusText || "Network Error!");
                }
            }
            else {
                // this.talert.showError(err.statusText || "Network Error!");
            }
        }
        // else this.talert.showError("Network Error!");
    }

}