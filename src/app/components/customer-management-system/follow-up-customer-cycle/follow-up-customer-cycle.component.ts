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
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-follow-up-customer-cycle',
  templateUrl: './follow-up-customer-cycle.component.html',
  styleUrls: ['./follow-up-customer-cycle.component.scss']
})

export class FollowUpCustomerCycleComponent implements OnInit, AfterViewInit {
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
  public fileName: string = 'Theo dõi doanh số khách hàng theo chu kỳ';
  public query: any = {
    retailerId: 717250,
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-03-31'),
    period: 2,
    page: 1,
    size: 20,
    search: '',
    branchId: localStorage.hasOwnProperty('branchId') && localStorage.getItem('branchId') ? Number(localStorage.getItem('branchId')) : 0,
  }
  public cols: any[] = [
    { field: "customerId", header: "#", typeField : 'text' },
    { field: "customerName", header: "Khách hàng", typeField : 'text' },
    { field: "period", header: `Tháng`, typeField : 'number' },
    { field: "revenue", header: "Doanh thu", typeField : 'number' },
  ];

  listPeriod: STATUS[] = [
    {
      label: 'Theo tuần',
      value: 1
    },
    {
      label: 'Theo tháng',
      value: 2
    },
    {
      label: 'Theo quý',
      value: 3
    }
  ]

  initCols() {
    this.cols = [
      { field: "customerId", header: "#", typeField : 'text' },
      { field: "customerName", header: "Khách hàng", typeField : 'text' },
      { field: "period", header: `${this.query.period === 1 ? 'Tuần' : this.query.period === 2 ? 'Tháng' : 'Quý'}`, typeField : 'number' },
      { field: "revenue", header: "Doanh thu", typeField : 'number' },
    ];
  }

  ngAfterViewInit() {
    this.$changeDetech.detectChanges();
  }

  refresh() {
    this.initCols();
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
      { label: `2. ${this.fileName}` },
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
          }else {
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
    this.getLists();
  }
  search() {
    this.initCols();
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
    this.$service.getCustomerRevenueInPeriod(queryParams)
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

  calculateCustomerTotal(name: string) {
    let total = 0;
    if (this.listDatas) {
      for (let product of this.listDatas) {
        if (product.customer.customerName === name) {
          total += product.revenue
        }
      }
    }
    return total;
  };

  isExpanded: boolean = true;
  expandedRows: any = {};
  expandAll(type: boolean = false) {
    this.isExpanded = type ? !this.isExpanded : this.isExpanded;
    if (this.listDatas.length > 0) {
      this.listDatas.forEach(data => {
        this.expandedRows[data.customer.customerName] = this.isExpanded;
      })
    } else {
      this.expandedRows = {};
    }
  }

  exportExcel() {
    const wscols = [
      { wch: 15 },
      { wch: 45 },
      { wch: 5 },
      { wch: 10 }
    ]
    let element = document.getElementById('my-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    ws['!cols'] = wscols;
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${this.fileName}.xlsx`,{ bookType: 'xlsx', type: 'buffer' });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
