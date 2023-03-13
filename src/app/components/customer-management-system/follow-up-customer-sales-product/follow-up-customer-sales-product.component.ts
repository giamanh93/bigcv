  import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject, ChangeDetectorRef, AfterViewInit, SimpleChanges, OnChanges } from '@angular/core';
  import { MessageService } from 'primeng/api';
  import queryString from 'query-string';
  import { Subject, takeUntil } from 'rxjs';
  import { HrmBreadcrumb } from 'src/app/common/components/hrm-breadcrumb/hrm-breadcrumb.component';
import { CustmerSearch, Customer } from 'src/app/models/customer-management-system';
  import { Branch, CountRecord, ProductWarning, SearchEarlyWarning } from 'src/app/models/early-warning';
import { customerManagementSystem } from 'src/app/services/customerManagementSystem.service';
  import { EarlyWarningSystemService } from 'src/app/services/earlyWarningSystem.service';
  @Component({
    selector: 'app-follow-up-customer-sales-product',
    templateUrl: './follow-up-customer-sales-product.component.html',
    styleUrls: ['./follow-up-customer-sales-product.component.scss']
  })
  
  export class FollowUpCustomerSalesProductComponent implements OnInit, AfterViewInit {
    itemsBreadcrumb: HrmBreadcrumb[] = [];
    countRecord: CountRecord = {
      totalRecord: 0,
      currentRecordStart: 0,
      currentRecordEnd: 0
    }
    private readonly unsubscribe$: Subject<void> = new Subject();
    private $https = inject(HttpClient);
    private $service = inject(customerManagementSystem);
    private $messageService = inject(MessageService);
    private $changeDetech = inject(ChangeDetectorRef);
    public listBranchs: Branch[] = [];
    public listDatas: any[] = [];
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
      // this.$https.get('https://primeng.org/assets/showcase/data/customers-medium.json').subscribe((results: any) => {
      //   this.listDatas = results.data ?? [];
      //   this.isLoading = false;
      // })
      this.listDatas = [];
      this.isLoading = true;
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
  
    loadTab1() {
     
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
          const totalHeight = a.clientHeight + b.clientHeight + c.clientHeight + d.clientHeight  + e.clientHeight + 12;
          this.heightGrid = window.innerHeight - totalHeight;
          console.log(this.heightGrid)
          this.$changeDetech.detectChanges();
        } else {
          this.loadjs = 0;
        }
      }
    }
  
  
    
  }
  