import { SearchEarlyWarning } from './../models/early-warning';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Responses } from '../models/responses';

const baseUrl = 'http://3.0.125.181:8888/api';

@Injectable({
    providedIn: 'root'
})
export class EarlyWarningSystemService {
    private $http = inject(HttpClient);
    //   private $messageService = inject(MessageService);


    getListProductNotProfitMargin(query: string): Observable<Responses> {
        return this.$http.get<Responses>(baseUrl + `/product/alert/v1/getListProductNotProfitMargin?` + query);
    }

    getListBranch(query: string): Observable<Responses> {
        return this.$http.get<Responses>(baseUrl + `/branch/v1/getListBranch?` + query);
    }

    private handleError(err: any, showError = true) {
        if (showError) {
            this.showError(err);
        }

        return of(undefined);
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