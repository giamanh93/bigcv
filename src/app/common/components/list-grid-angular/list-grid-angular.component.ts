import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, } from 'rxjs';
import { TotalValueFooterComponent } from '../total-value-component/total-value-component';
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
  @Input() autoGroupColumnDef: any = {};
  @Input() rowClassRules: any;
  @Input() noRowsTemplate: any = 'Không có kết quả phù hợp';
  @Input() pinnedTopRowData: any[] = [];
  @Input() floatingFilter: boolean = false;
  @Input() groupIncludeFooter: boolean = false;
  @Input() groupIncludeTotalFooter: boolean = false;
  @Input() groupDefaultExpanded: number = 1;;
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
    filter: true,
    floatingFilter: true,
    rowHeight: 90,
    cellClass: [],
    tooltipComponentParams: { color: '#ececec' },
  };;
  @Input() domLayout: string = '';
  @Input() height: number = 0;
  @Input() heightRow: number = 37;
  @Input() headerHeight: number = 35;
  @Input() floatingFiltersHeight: number = 35;
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
  heightAuto = 0;
  tooltipShowDelay = 0;
  titlePage = '';
  listsDataCloone = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,

  ) {
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

    this.getRowHeight = (params: any) => {
      return this.heightRow
    };
  }

  ngOnInit(): void {
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    setTimeout(() => {
      params.api.sizeColumnsToFit();
    }, 100);
    window.onresize = () => {
      this.gridApi.sizeColumnsToFit();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.hasOwnProperty('groupDefaultExpanded') && this.gridApi) {
      changes['groupDefaultExpanded']['currentValue'] === 1 ? this.gridApi.expandAll() : this.gridApi.collapseAll();
    }
    this.heightAuto = this.height;
  }

  onGridSizeChanged(params: any) {

    // option chưa dùng được
    console.log("sdsdsd")
    // get the current grids width
    var gridWidth: any = document.getElementById(this.idGrid);
    console.log("gridWidth", gridWidth)
    // keep track of which columns to hide/show
    var columnsToShow = [];
    var columnsToHide = [];

    // iterate over all columns (visible or not) and work out
    // now many columns can fit (based on their minWidth)
    var totalColsWidth = 0;
    var allColumns = params.columnApi.getAllColumns();
    for (var i = 0; i < allColumns.length; i++) {
      let column = allColumns[i];
      totalColsWidth += column.getMinWidth();
      if (totalColsWidth > gridWidth.offsetWidth) {
        columnsToHide.push(column.colId);
      } else {
        columnsToShow.push(column.colId);
      }
    }

    // show/hide columns based on current grid width
    params.columnApi.setColumnsVisible(columnsToShow, true);
    params.columnApi.setColumnsVisible(columnsToHide, false);

    // fill out any available space to ensure there are no gaps
    params.api.sizeColumnsToFit();
  }

  private readonly unsubscribe$: Subject<void> = new Subject();
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onFirstDataRendered() {
    this.gridApi.sizeColumnsToFit()
  }


  autoSizeAll(skipHeader: boolean) {
    const allColumnIds: string[] = [];
    this.gridColumnApi.getColumns()!.forEach((column: any) => {
      allColumnIds.push(column.getId());
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
  }
}
