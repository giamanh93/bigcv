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
import * as XLSX from 'xlsx'; import { AgGridFn, autoSizeAllGrid } from 'src/app/common/function/lib';
import { ColDef, GetRowIdFunc, GetRowIdParams } from 'ag-grid-community';
import { NgxSpinnerService } from 'ngx-spinner';
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
  private $spinner = inject(NgxSpinnerService);
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
  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => {
    return params.data.areaId;
  };
  detailCellRendererParams: any = null;
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
    { field: "areaId", header: "#", typeField: 'text', masterDetail: true },
    { field: "areaName", header: "Khu vực", typeField: 'text', width: 200 },
    { field: "revenue", header: "Doanh thu", typeField: 'decimal', aggFunc: 'sum' }
  ];

  public colsDetail: any[] = [
    { field: "customerId", header: "#", typeField: 'text', headerClass: 'bg-primary-reverse', cellClass: ['bg-primary-reverse'] },
    { field: "customerName", header: "Khách hàng", typeField: 'text', width: 200, headerClass: 'bg-primary-reverse', cellClass: ['bg-primary-reverse'] },
    { field: "address", header: "Địa chỉ", typeField: 'text', headerClass: 'bg-primary-reverse', cellClass: ['bg-primary-reverse'] },
    { field: "purchaseDate", header: "Ngày hóa đơn", typeField: 'text', headerClass: 'bg-primary-reverse', cellClass: ['bg-primary-reverse'] },
    { field: "staff", header: "Nhân viên bán", typeField: 'text', headerClass: 'bg-primary-reverse', cellClass: ['bg-primary-reverse'] },
    { field: "salePanel", header: "Kênh bán", typeField: 'text', headerClass: 'bg-primary-reverse', cellClass: ['bg-primary-reverse'] },
    { field: "revenue", header: "Doanh thu", typeField: 'decimal', aggFunc: 'sum', headerClass: 'bg-primary-reverse', cellClass: ['bg-primary-reverse'] }
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
    this.query.size = 20;
    this.first = 1;
    this.countRecord = {
      totalRecord: 0,
      currentRecordStart: 0,
      currentRecordEnd: 0
    }
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
    const d: any = document.querySelector(".toolbar");
    this.loadjs++
    if (this.loadjs === 5) {
      if (b && b.clientHeight && d) {
        const totalHeight = a.clientHeight + b.clientHeight + c.clientHeight + d.clientHeight  + 20 ;
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
    this.detailCellRendererParams = {
      refreshStrategy: 'everything',
      detailGridOptions: {
        headerHeight: 35,
        frameworkComponents: {
        },
        defaultColDef: {
          filter: true,
          // floatingFilter: true,
        },
        onGridReady: (params: any) => {
          params.api.setDomLayout("autoHeight");
          params.api.showLoadingOverlay();
        },
        getRowHeight: (params: any) => {
          return 37;
        },
        columnDefs: [
          ...AgGridFn(this.colsDetail),
        ],

        enableCellTextSelection: true,
        onFirstDataRendered(params: any) {
          // params.api.sizeColumnsToFit();
          autoSizeAllGrid(false,params.columnApi)
          params.api.hideOverlay();
        },
      },
      getDetailRowData(params: any) {
        params.successCallback(params.data.childrens);
      },
      excelStyles: [
        {
          id: 'stringType',
          dataType: 'string'
        }
      ],
      template: function (params: any) {
        var personName = params.data.areaName;
        const total = eval(params.data.childrens.map((item: any) => item.revenue).join('+'))
        return (
          '<div style="height: 100%; background-color: #EDF6FF; padding: 20px; box-sizing: border-box;">' +
          `  <div style="height: 10%; padding: 2px; font-weight: bold;">Danh sách ${personName} (${params.data.childrens.length})` +
          '</div>' +
          '  <div ref="eDetailGrid" style="height: 90%;"></div>' +
          '</div>'
        );
      },
    };
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

  rowGroupOpenedCallback(event: any) {
    if (event.data.childrens.length === 0) {
      const index = this.listDatas.findIndex(d => d.customerId === event.data.customerId)
      this.getDaitel(event.data.customerId, event);
    }
  }

  getDaitel(customerId: string, event: any) {
    const params = { ...this.query, customerId: customerId };
    params.endDate = this.$datepipe.transform(this.query.endDate, 'yyyy-MM-dd');
    params.startDate = this.$datepipe.transform(this.query.startDate, 'yyyy-MM-dd');
    localStorage.setItem('filterDate', JSON.stringify({ endDate: params.endDate, startDate: params.startDate }));
    const queryParams = queryString.stringify(params);
    this.$service.getRevenueByCustomerDetail(queryParams)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(results => {
        if (results.success) {
          const itemsToUpdate: any[] = [];
          event.api.forEachNodeAfterFilterAndSort( (rowNode: any, index: number) =>{
            const data = rowNode.data;
            if (rowNode.data.customerId === customerId) {
              data.childrens = results.data.content;
              itemsToUpdate.push(data);
            }
          });
          event.api.applyTransaction({ update: itemsToUpdate })!;
          setTimeout( () =>{
            event.api.resetRowHeights();
            // event.api.refreshServerSide({ route: customerId, purge: true })
            event.api.getDisplayedRowAtIndex(event.rowIndex)!.setExpanded(true);
          }, 0);
        } else {
          this.listDatas = [];
          this.isLoading = false;
          this.$messageService.add({ severity: 'error', summary: 'Error Message', detail: results.code });
        }
      })
  }


}
