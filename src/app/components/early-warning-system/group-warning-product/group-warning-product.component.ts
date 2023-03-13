
import { Component, OnInit, inject, ChangeDetectorRef, AfterViewInit, SimpleChanges, OnChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import queryString from 'query-string';
import { Subject, takeUntil } from 'rxjs';
import { HrmBreadcrumb } from 'src/app/common/components/hrm-breadcrumb/hrm-breadcrumb.component';
import { Branch, CountRecord, ProductWarning, SearchEarlyWarning } from 'src/app/models/early-warning';
import { EarlyWarningSystemService } from 'src/app/services/earlyWarningSystem.service';
@Component({
	selector: 'app-group-warning-product',
	templateUrl: './group-warning-product.component.html',
	styleUrls: ['./group-warning-product.component.scss']
})

export class GroupWarningProductComponent implements OnInit, AfterViewInit {
	itemsBreadcrumb: HrmBreadcrumb[] = [];
	indexTab: number = 0;
	countRecord: CountRecord = {
		totalRecord: 0,
		currentRecordStart: 0,
		currentRecordEnd: 0
	}
	private readonly unsubscribe$: Subject<void> = new Subject();
	private $service = inject(EarlyWarningSystemService);
	private $messageService = inject(MessageService);
	private $changeDetech = inject(ChangeDetectorRef);
	public listBranchs: Branch[] = [];
	public listDatas: ProductWarning[] = [];
	public listDatasLoading: any[] = Array(20).fill(1).map((x, i) => i);
	public isLoading: boolean = false;
	public query: SearchEarlyWarning = {
		retailerId: 717250,
		search: '',
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
		this.isLoading = true;
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
					this.isLoading = false;
				} else {
					this.listDatas = [];
					this.isLoading = false;
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
					this.isLoading = false;
				} else {
					this.listDatas = [];
					this.isLoading = false;
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
					this.isLoading = false;
				} else {
					this.listDatas = [];
					this.isLoading = false;
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
					this.isLoading = false;
				} else {
					this.listDatas = [];
					this.isLoading = false;
					this.$messageService.add({ severity: 'error', summary: 'Error Message', detail: results.code });
				}
			})
	}

	handleChange(index: number) {
		this.indexTab = index;
		this.getLists();
	}

	first: number = 0;
	paginate(event: any) {
		this.query.page = event.first;
		this.first = event.first;
		this.query.size = event.rows;
		this.getLists();
	}

	fnCountRecord(results: any) {
		this.countRecord.totalRecord = results.totalPages;
		this.countRecord.currentRecordStart = results.totalPages === 0 ? this.query.page = 0 : this.query.page + 1;
		if ((results.totalPages - this.query.page) > this.query.size) {
			this.countRecord.currentRecordEnd = this.query.page + Number(this.query.size);
		} else {
			this.countRecord.currentRecordEnd = results.totalPages;
		}
	}

	loadjs = 0;
	heightGrid = 0
	ngAfterViewChecked(): void {
		const a: any = document.querySelector(".header");
		const b: any = document.querySelector(".sidebarBody");
		const c: any = document.querySelector(".breadcrumb");
		const e: any = document.querySelector(".paginator");
		const d: any = document.querySelector(".toolbar");
		this.loadjs++
		if (this.loadjs === 5) {
			if (b && b.clientHeight && d) {
				const totalHeight = a.clientHeight + b.clientHeight + c.clientHeight + d.clientHeight  + e.clientHeight + 91;
				this.heightGrid = window.innerHeight - totalHeight;
				console.log(this.heightGrid)
				this.$changeDetech.detectChanges();
			} else {
				this.loadjs = 0;
			}
		}
	}


	
}
