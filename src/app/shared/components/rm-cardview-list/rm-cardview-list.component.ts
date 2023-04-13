import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "rm-cardview-list",
  templateUrl: "./rm-cardview-list.component.html",
  styleUrls: ["./rm-cardview-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class RMCardViewListComponent implements OnInit, OnChanges {
  @Input() cardConfig: any;
  @Input() type: string | any; // 'org' | 'user' | 'group
  @Input() selectable!: boolean;
  // @Input() rowData!: any[];
  @Input() rowData!: any;
  @Input() filterValue!: string;
  @Output() rowDataChange: EventEmitter<any> = new EventEmitter();
  @Input() actions!: any[]; // edit/ delete/ download
  @Output() onCardActionClick: EventEmitter<any> = new EventEmitter();
  @Output() onCardToggleClick: EventEmitter<any> = new EventEmitter();
  @Output() onCardLogoClick: EventEmitter<any> = new EventEmitter();
  @Output() onCardLinkClick: EventEmitter<any> = new EventEmitter();

  // 2 Way Binded
  @Input() selectedRows!: any[];
  @Output() selectedRowsChange: EventEmitter<any> = new EventEmitter();

  // Variables
  cardFilter: any = {
    key: null, //"checkboxConfig"
    condition: null, //true
    childKey: null, //"isChecked"
  };

  get filteredRowData() {
    const filteredRecords = this.rowData ? this.rowData.filter((item: any) => {
      return this.filterValue ? JSON.stringify(item).toLowerCase().includes(this.filterValue.toLowerCase()) : true
    }) : []
    return filteredRecords
  }

  constructor() {}

  ngOnChanges(e: any) {
    this.rowData.forEach((row: any) => {
      // Check if row exist in selected
      const condition = this.selectedRows.some(
        (rowItem: any) => rowItem == row
      );
      row["checkboxConfig"] = {
        isChecked: condition,
        attributes: {},
      };
    });
  }

  ngOnInit() {
    
  }

  //Events
  onActionClick(event: any) {
    this.onCardActionClick.emit(event);
  }
  onToggleClick(event: any) {
    this.onCardToggleClick.emit(event);
  }
  onLogoClick(event: any) {
    this.onCardLogoClick.emit(event);
  }
  onLinkClick(event: any) {
    this.onCardLinkClick.emit(event);
  }

  onCheckboxClick(event: any) {
    // 
    // 
    const values = this.rowData.filter(
      (row: any) => row["checkboxConfig"].isChecked
    );
    this.rowDataChange.emit(this.rowData)
    this.selectedRows = values;
    // 
    this.selectedRowsChange.emit(values);
  }

  updateSelectedRows(value: any) {
    this.selectedRows = value;
    this.selectedRowsChange.emit(value);
  }
}
