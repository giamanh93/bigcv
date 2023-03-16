import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject,  } from 'rxjs';
@Component({
  selector: 'app-list-grid-angular',
  templateUrl: './list-grid-angular.component.html',
  styleUrls: ['./list-grid-angular.component.css']
})
export class ListGridAngularComponent implements OnInit, OnChanges {
  @Input() listsData: Array<any> = [];
  @Output() FnClick = new EventEmitter<any>();
  @Output() rowDoubleClicked = new EventEmitter<any>();
  @Output() firstDataRendered = new EventEmitter<any>();
  @Output() cellDoubleClicked = new EventEmitter<any>();
  @Output() onCellClicked = new EventEmitter<any>();
  @Output() callback = new EventEmitter<any>();
  @Output() showConfig = new EventEmitter<any>();
  @Input() columnDefs: Array<any> = [];
  @Input() isConfig: boolean = true;
  @Input() rowSelection: string = 'single';
  @Input() frameworkComponents = {};
  @Input() detailCellRendererParams: any;
  @Input() rowClassRules: any;
  @Input() noRowsTemplate: any = 'Không có kết quả phù hợp';
  @Input() pinnedTopRowData: any[] = [];
  @Input() floatingFilter: boolean = false;
  @Input() buttons = [];
  @Input() isShowButton: boolean = false;
  @Input() title: string = '';
  @Input() idGrid: string = 'myGrid';
  @Input() typeConfig: string = 'myGrid';
  @Input() defaultColDef: any = {
    tooltipComponent: 'customTooltip',
    resizable: true,
    suppressSorting: false,
    sortable: false,
    suppressSizeToFit: false,
    filter: '',
    rowHeight: 90,
    cellClass: [],
    tooltipComponentParams: { color: '#ececec' },
  };;
  @Input() domLayout: string = '';
  @Input() height: number = 0;
  @Input() heightRow: number = 40;
  @Input() headerHeight: number = 45;
  @Input() floatingFiltersHeight: number = 36;
  @Input() getContextMenuItems: any = null;
  @Input() excelStyles: any[] = [
    {
      id: 'stringType',
      dataType: 'string'
    },
    {
      id: 'dateFormat',
      dataType: 'dateTime',
      numberFormat: { format: 'mm/dd/yyyy;@' },
    },
    {
      id: 'text-right',
      dataType: 'number',
      numberFormat: { format: '#,##0' },
    }
  ];
  sideBar: any
  gridApi: any;
  getRowHeight: any;
  gridColumnApi: any;
  groupDefaultExpanded = 0;
  heightAuto = 0;
  tooltipShowDelay = 0;
  titlePage = '';
  listsDataCloone = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,

  ) {


    this.frameworkComponents = {
    };
    this.tooltipShowDelay = 0

    this.sideBar = {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Ẩn hiện cột',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
          toolPanelParams: {
            suppressRowGroups: false,
            suppressValues: false,
            suppressPivots: true,
            suppressPivotMode: true,
            suppressColumnFilter: true,
            suppressColumnSelectAll: true,
            suppressColumnExpandAll: true,
            suppressSyncLayoutWithGrid: true,
            suppressColumnMove: false,
          },
        },
      ],
      defaultToolPanel: '',
    };
  }

  ngOnInit(): void {
  }
 
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  ngOnChanges() {
    this.heightAuto = this.height;
  }

  private readonly unsubscribe$: Subject<void> = new Subject();
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
