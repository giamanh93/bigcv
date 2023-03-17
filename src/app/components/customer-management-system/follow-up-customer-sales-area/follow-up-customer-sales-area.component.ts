import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, ChangeDetectorRef, AfterViewInit, SimpleChanges, OnChanges, HostListener } from '@angular/core';
import { MessageService } from 'primeng/api';
import queryString from 'query-string';
import { Subject, takeUntil } from 'rxjs';
import { HrmBreadcrumb } from 'src/app/common/components/hrm-breadcrumb/hrm-breadcrumb.component';
import { STATUS } from 'src/app/models/customer-management-system';
import { Branch, CountRecord } from 'src/app/models/early-warning';
import { customerManagementSystem } from 'src/app/services/customerManagementSystem.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx'; import { AgGridFn } from 'src/app/common/function/lib';
import { ColDef } from 'ag-grid-community';
@Component({
  selector: 'app-follow-up-customer-sales-area',
  templateUrl: './follow-up-customer-sales-area.component.html',
  styleUrls: ['./follow-up-customer-sales-area.component.scss']
})

export class FollowUpCustomerSalesAreaComponent implements OnInit, AfterViewInit {
  itemsBreadcrumb: HrmBreadcrumb[] = [];
  screenWidth: number = 0;
  countRecord: CountRecord = {
    totalRecord: 0,
    currentRecordStart: 0,
    currentRecordEnd: 0
  }
  private readonly unsubscribe$: Subject<void> = new Subject();
  private $service = inject(customerManagementSystem);
  private $datepipe = inject(DatePipe);
  private $messageService = inject(MessageService);
  private $changeDetech = inject(ChangeDetectorRef);
  public listBranchs: Branch[] = [];
  public listDatas: any[] = [];
  public listDatasLoading: any[] = Array(20).fill(1).map((x, i) => i);
  public isLoading: boolean = false;
  public fileName: string = 'Theo dõi danh số khách hàng theo khu vực';
  public query: any = {
    retailerId: 717250,
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-03-31'),
    page: 1,
    size: 20,
    search: '',
    branchId: localStorage.hasOwnProperty('branchId') && localStorage.getItem('branchId') ? Number(localStorage.getItem('branchId')) : 0,
  }
  public autoGroupColumnDef: ColDef = {
    minWidth: 300,
    cellRendererParams: {
      footerValueGetter: (params: any) => {
        const isRootLevel = params.node.level === -1;
        if (isRootLevel) {
          return 'Grand Total';
        }
        return `Sub Total (${params.value})`;
      },
    }
  };
  public columnDefs: ColDef[] = [];
  public cols: any[] = [
    { field: "customerId", header: "#", typeField: 'text' },
    { field: "areaName", header: "Khu vực", typeField: 'text', rowGroup: true, width: 200 },
    { field: "customerName", header: "Khách hàng", typeField: 'text', width: 300 },
    { field: "address", header: "Địa chỉ", typeField: 'text' },
    { field: "purchaseDate", header: "Ngày hóa đơn", typeField: 'text' },
    { field: "staff", header: "Nhân viên bán", typeField: 'text' },
    { field: "salePanel", header: "Kênh bán", typeField: 'text' },
    { field: "revenue", header: "Doanh thu", typeField: 'decimal', aggFunc: 'sum' }
  ];


  ngAfterViewInit() {
    this.$changeDetech.detectChanges();
  }

  refresh() {
    this.query.startDate = new Date('2023-01-01');
    this.query.endDate = new Date('2023-03-31');
    this.query.period = 2;
    this.getLists();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.onInitGrid();
    const filterDate = localStorage.hasOwnProperty('filterDate') && localStorage.getItem('filterDate') ? localStorage.getItem('filterDate') : null;
    if (filterDate) {
      this.query.endDate = JSON.parse(filterDate).endDate;
      this.query.startDate = JSON.parse(filterDate).startDate;
    } else {
      this.query.startDate = new Date('2023-01-01');
      this.query.endDate = new Date('2023-03-31');
    }
    this.screenWidth = window.innerWidth;
    this.itemsBreadcrumb = [
      { label: 'Trang chủ', routerLink: '/home' },
      { label: 'Hệ thống quản trị khách hàng' },
      { label: `4. ${this.fileName}` },
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
          if (this.query.branchId === 0 && this.listBranchs.length > 0) {
            setTimeout(() => {
              this.query.branchId = this.listBranchs[2].branchId;
              this.getLists();
            }, 10);
          } else {
            this.getLists();
          }
        } else {
          this.listDatas = [];
          this.$messageService.add({ severity: 'error', summary: 'Error Message', detail: results.code });
        }
      })
  }

  changeBranch() {
    localStorage.setItem('branchId', this.query.branchId?.toString() ?? '');
    this.query.page = 1;
    this.query.page = 20;
    this.getLists();
  }
  search() {
    this.getLists();
  }
  getLists() {
    this.listDatas = [];
    this.isLoading = true;
    const params = { ...this.query };
    params.endDate = this.$datepipe.transform(this.query.endDate, 'yyyy-MM-dd');
    params.startDate = this.$datepipe.transform(this.query.startDate, 'yyyy-MM-dd');
    localStorage.setItem('filterDate', JSON.stringify({ endDate: params.endDate, startDate: params.startDate }));
    const queryParams = queryString.stringify(params);
    this.$service.getCustomerRevenueByArea(queryParams)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(results => {
        if (results.success) {
          this.listDatas = results.data.content ?? [];
          this.isLoading = false;
          this.fnCountRecord(results.data);
          this.expandAll(false)
        } else {
          this.listDatas = [];
          this.isLoading = false;
          this.$messageService.add({ severity: 'error', summary: 'Error Message', detail: results.code });
        }
      })
  }

  first: number = 1;
  paginate(event: any) {
    this.query.page = event.page + 1;
    this.first = event.first;
    this.query.size = event.rows;
    this.getLists();
  }

  fnCountRecord(results: any) {
    this.countRecord.totalRecord = results.totalElements;
    this.countRecord.currentRecordStart = this.query.page === 1 ? this.query.page = 1 : this.countRecord.currentRecordEnd;
    this.countRecord.currentRecordEnd = this.query.page === 1 ? this.query.size : this.query.page * Number(this.query.size)
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
        const totalHeight = a.clientHeight + b.clientHeight + c.clientHeight + d.clientHeight + e.clientHeight + 12;
        this.heightGrid = window.innerHeight - totalHeight;
        console.log(this.heightGrid)
        this.$changeDetech.detectChanges();
      } else {
        this.loadjs = 0;
      }
    }
  }

  isExpanded: boolean = true;
  expandAll(type: boolean = false) {
    this.isExpanded = type ? !this.isExpanded : this.isExpanded;
  }

  onInitGrid() {
    this.columnDefs = [
      ...AgGridFn(this.cols)
    ]
  }

  getContextMenuItems(params: any) {
    var result = [
      'copy',
      'paste',
      'separator',
      'excelExport'
    ];
    return result;
  }

}
