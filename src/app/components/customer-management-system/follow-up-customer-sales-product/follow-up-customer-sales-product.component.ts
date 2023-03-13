
import { Component, OnInit, inject, ChangeDetectorRef, AfterViewInit, SimpleChanges, OnChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import queryString from 'query-string';
import { Subject, takeUntil } from 'rxjs';
import { HrmBreadcrumb } from 'src/app/common/components/hrm-breadcrumb/hrm-breadcrumb.component';
import { CustmerSearch, Customer } from 'src/app/models/customer-management-system';
import { Branch} from 'src/app/models/early-warning';
import { customerManagementSystem } from 'src/app/services/customerManagementSystem.service';
@Component({
  selector: 'app-follow-up-customer-sales-product',
  templateUrl: './follow-up-customer-sales-product.component.html',
  styleUrls: ['./follow-up-customer-sales-product.component.scss']
})
export class FollowUpCustomerSalesProductComponent implements OnInit, AfterViewInit {

	private readonly unsubscribe$: Subject<void> = new Subject();
	private $service = inject(customerManagementSystem);
	private $messageService = inject(MessageService);
	private $changeDetech = inject(ChangeDetectorRef);

  itemsBreadcrumb: HrmBreadcrumb[] = [];
	public listBranchs: Branch[] = [];
	public listDatas: Customer[] = [];
	public listDatasLoading: any[] = Array(20).fill(1).map((x, i) => i);
	public isLoading: boolean = false;
	public query: CustmerSearch = {
		retailerId: 717250,
    startDate: '',
    endDate: '',
		page: 0,
		size: 50,
		branchId: localStorage.hasOwnProperty('branchId') && localStorage.getItem('branchId') ? Number(localStorage.getItem('branchId')) : 0,
	}

	ngAfterViewInit() {
		this.$changeDetech.detectChanges();
	}

	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

	ngOnInit(): void {
		this.itemsBreadcrumb = [
			{ label: 'Trang chủ', routerLink: '/home' },
			{ label: 'Hệ thống quản trị khách hàng' },
			{ label: '1. Theo dõi doanh số khách hàng theo sản phẩm' },
		];
		this.getListBranch();
	}

	getListBranch() {
		const queryParams = queryString.stringify({ retailerId: 717250 });
		this.$service.getListBranch(queryParams)
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(results => {
				if (results.success) {
					this.listBranchs = results.data.content ?? [];
					if (this.query.branchId === 0 && this.listBranchs.length > 0) this.query.branchId = this.listBranchs[0].branchId;
					this.getLists();
				} else {
					this.listDatas = [];
					this.$messageService.add({ severity: 'error', summary: 'Error Message', detail: results.code });
				}
			})
	}

	changeBranch() {
		localStorage.setItem('branchId', this.query.branchId?.toString() ?? '');
		this.getLists();
	}

	getLists() {
		const queryParams = queryString.stringify(this.query);
		this.$service.getRevenueByCustomer(queryParams)
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(results => {
				if (results.success) {
					this.listDatas = results.data.content ?? [];
					this.isLoading = false;
				} else {
					this.listDatas = [];
					this.isLoading = false;
					this.$messageService.add({ severity: 'error', summary: 'Error Message', detail: results.code });
				}
			})
	}
}
