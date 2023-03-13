
import { Component, OnInit, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import queryString from 'query-string';
import { Subject, takeUntil } from 'rxjs';
import { HrmBreadcrumb } from 'src/app/common/components/hrm-breadcrumb/hrm-breadcrumb.component';
import { Branch, EarlyWarning, ProductWarning, SearchEarlyWarning } from 'src/app/models/early-warning';
import { EarlyWarningSystemService } from 'src/app/services/earlyWarningSystem.service';


@Component({
	selector: 'app-group-warning-product',
	templateUrl: './group-warning-product.component.html',
	styleUrls: ['./group-warning-product.component.scss']
})
export class GroupWarningProductComponent implements OnInit {
	itemsBreadcrumb: HrmBreadcrumb[] = [];
	indexTab: number = 0;
	products: EarlyWarning[] = [];
	private readonly unsubscribe$: Subject<void> = new Subject();
	private $service = inject(EarlyWarningSystemService);
	private $messageService = inject(MessageService);
	public listBranchs: Branch[] = [];
	public listDatas: ProductWarning[] = [];
	public query: SearchEarlyWarning = {
		retailerId: 717250,
		search: '',
		page: 0,
		size: 50,
		branchId: 0,
	}

	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

	ngOnInit(): void {
		this.itemsBreadcrumb = [
			{ label: 'Trang chủ', routerLink: '/home' },
			{ label: 'Hệ thống cảnh báo sớm' },
			{ label: '1. Nhóm cảnh báo liên quan đến sản phẩm' },
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
					this.query.branchId = this.listBranchs.length > 0 ? this.listBranchs[0].branchId : 0;
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
		this.listDatas = [];
		switch (this.indexTab) {
			case 0:
				this.loadTab1();
				break;
			case 1:
				this.loadTab2();
				break;
			case 2:
				this.loadTab3();
				break;
			case 3:
				this.loadTab4();
				break;

			default:
				this.loadTab1();
				break;
		}
	}

	loadTab1() {
		const queryParams = queryString.stringify(this.query);
		this.$service.getListProductNotProfitMargin(queryParams)
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(results => {
				if (results.success) {
					this.listDatas = results.data.content ?? [];
				} else {
					this.listDatas = [];
					this.$messageService.add({ severity: 'error', summary: 'Error Message', detail: results.code });
				}
			})
	}
	loadTab2() {
		const queryParams = queryString.stringify(this.query);
		this.$service.getListProductNotProfitMargin(queryParams)
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(results => {
				if (results.success) {
					this.listDatas = results.data.content ?? [];
				} else {
					this.listDatas = [];
					this.$messageService.add({ severity: 'error', summary: 'Error Message', detail: results.code });
				}
			})
	}
	loadTab3() {
		const queryParams = queryString.stringify(this.query);
		this.$service.getListProductNotProfitMargin(queryParams)
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(results => {
				if (results.success) {
					this.listDatas = results.data.content ?? [];
				} else {
					this.listDatas = [];
					this.$messageService.add({ severity: 'error', summary: 'Error Message', detail: results.code });
				}
			})
	}
	loadTab4() {
		const queryParams = queryString.stringify(this.query);
		this.$service.getListProductNotProfitMargin(queryParams)
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(results => {
				if (results.success) {
					this.listDatas = results.data.content ?? [];
				} else {
					this.listDatas = [];
					this.$messageService.add({ severity: 'error', summary: 'Error Message', detail: results.code });
				}
			})
	}

	handleChange(index: number) {
		this.indexTab = index;
		this.getLists();
	}

}
