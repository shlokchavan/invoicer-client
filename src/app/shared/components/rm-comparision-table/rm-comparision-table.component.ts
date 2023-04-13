import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import { IResponseSchema } from 'src/app/configs/api-config';
import { GlobalConfig } from 'src/app/configs/global-config';
import { UnlimitedNumberConstant } from 'src/app/core/constants/data-constant';
import { EncryptedStorage } from '../../utils/encrypted-storage';
import { ISelectConfig } from '../rm-select-box/rm-select-box.model';
import { IToggleConfig } from '../rm-toggle/rm-toggle.model';
import { RMComparisionTableService } from './rm-comparision-table.service';

@Component({
  selector: 'rm-comparision-table',
  templateUrl: './rm-comparision-table.component.html',
  styleUrls: ['./rm-comparision-table.component.scss']
})
export class RMComparisionTableComponent implements OnInit, OnChanges {
  // Parameters
  @Input() apiEndPoint;
  @Input() packagesData: any[];
  @Input() pageIndex: number;
  @Input() totalPage: number;
  @Input() enableAddPackage: boolean;
  @Input() userMode: 'sp' | 'sr' | 'client' = "sp"
  @Input() enablePackageSelection: boolean;
  @Output() pageIndexChange: EventEmitter<number> = new EventEmitter();
  @Output() onButtonClick: EventEmitter<any> = new EventEmitter();
  @ViewChild('tableParent') tableParent;
  @ViewChild('btnCarousel') btnCarousel;

  @Output() onClick: EventEmitter<any> = new EventEmitter();

  //temp
  tempDisable = false;
  selectedPackageForNewPackageOnTable = {
    data: ''
  };

  // Variable
  data: any[];
  FirstRow: any;
  ServiceRows: any[];
  displayDifferenceOnly: boolean;
  UnlimitedConstantValue = UnlimitedNumberConstant

  //Configs
  newPackageSelection: ISelectConfig = {
    fieldKey: 'data',
    attributes: {
      type: 'text',
      placeholder: 'Select a Package',
    },
    dataKey: 'name',
    disableBoolKey: 'isSelected',
    returnKey: this.packageId,
    options: []
  };

  showDifferenceInPackagesConfig: IToggleConfig = {
    isActive: false,
    attributes: {
      label: `Show Difference Only`
    }
  }

  constructor(private service: RMComparisionTableService) {
    // Initialize Default Properties
    this.pageIndex = 1;
    this.totalPage = 1;
    this.enablePackageSelection = false;
    this.enableAddPackage = true;
  }

  ngOnInit() {
    window.onresize = () => {
      this.calculatePages();
      this.gotoPageNumber(1)
    }
  }

  showDifferenceInPackages() {
    const countOfPackages = this.packagesData.length;
    this.ServiceRows = this.ServiceRows.map((record) => {
      let count = 0;
      for (const key in record) {
        // Data Object
        if (key !== 'serviceName' && key !== 'isHidden') {
          count += record[key]['isActive'];
        }
      }
      // Show Different Records
      if (this.displayDifferenceOnly) record['isHidden'] = (count == countOfPackages || count == 0);
      else record['isHidden'] = false;
      return record;
    });
  }

  // Toggle Changed
  toggleChanged(data: IToggleConfig) {
    this.displayDifferenceOnly = Boolean(data.isActive);
    this.showDifferenceInPackages();
    // 
  }

  backToPackages() {
    const event = {
      type: 'close',
      data: null
    }
    this.onButtonClick.emit(event);
  }

  viewPackage(packageData) {
    const event = {
      type: 'view-package',
      data: packageData
    }
    this.onButtonClick.emit(event)
  }

  ngOnChanges(e) {
    if (this.apiEndPoint && this.packagesData) {
      this.newPackageSelection.options = _.cloneDeep(this.packagesData)
      this.packagesData = this.packagesData.filter(obj => obj.isSelected)
      if (this.packagesData.length > 0)
        this.getComparePackagesData();
    }
    if (this.apiEndPoint && this.userMode == "client") {
      this.enableAddPackage = false;
      this.enablePackageSelection = true;
      this.getClientPackages()
    }
  }

  getComparePackagesData(isNew?: boolean) {
    if (isNew) this.newPackageSelection.attributes.placeholder = "Loading...";
    this.tempDisable = true;
    this.service.getComparisionOfPackages(this.apiEndPoint + this.packagesData.reduce((value, pck, index) => {
      if (index != this.packagesData.length - 1)
        return value += this.packageId + "=" + pck[this.packageId] + "&";
      else return value += this.packageId + "=" + pck[this.packageId];
    }, "?")).subscribe(
      (response: IResponseSchema) => {
        this.data = response.data;
        this.newPackageSelection.attributes.placeholder = "Select a Package"
        this.dataAndLogicMapper();
        this.tempDisable = false;
      }
    );
  }

  getClientPackages() {
    forkJoin([this.service.getComparisionOfPackages(this.apiEndPoint), this.service.getAllClientPackages(JSON.parse(new EncryptedStorage().getItem(new GlobalConfig().userAllDetailsLSName)!).organizationId)])
      .subscribe(
        (responses: IResponseSchema[]) => {
          this.packagesData = responses[1].data.map(packageData => {
            // Append _ to package id and convert to string so the numeric key should not get auto sorted;
            packageData['packageId'] = "_" + packageData['packageId']
            packageData['isCurrentPlan'] = this.checkExistingPackage(packageData)
            return packageData;
          }).sort((a, b) => b.isCurrentPlan - a.isCurrentPlan);
          // Append _ to package id and convert to string so the numeric key should not get auto sorted;
          this.data = responses[0].data.map(serviceData => {
            serviceData['packageId'] = "_" + serviceData['packageId']
            return serviceData
          });
          this.dataAndLogicMapper();
        }
      );
  }

  checkExistingPackage(packageItem) {
    let isCurrentPlan = false;
    if (this.userMode == "client") {
      if (packageItem.activationDate && packageItem.expiryDate) {
        if (moment().isBetween(moment(packageItem.activationDate), moment(packageItem.expiryDate)))
          isCurrentPlan = true;
      }
    }
    return isCurrentPlan
  }

  getTotalCalculatedPrice(packageObj) {
    return packageObj.basePrice + (packageObj.userLoadPrice * 
      (packageObj.maxUserLimit == UnlimitedNumberConstant ? 5000 : packageObj.maxUserLimit)
      )
  }

  disableEnableToggleButton() {
    // Disable/ Enable Toggle Button
    if (this.packagesData.length > 1) {
      this.showDifferenceInPackagesConfig.attributes.disable = false;
    } 
    else {
      this.showDifferenceInPackagesConfig.attributes.disable = true;
      this.showDifferenceInPackagesConfig.isActive = false;
      this.displayDifferenceOnly = false
    } 
  }

  dataAndLogicMapper() {
    this.disableEnableToggleButton();
    let groupByPackages = {}
    if (this.userMode == "client") {
      const sortPattern = this.packagesData.map(data => data.packageId)
      const tempUnsortedGroup = _.groupBy(this.data, this.packageId);
      sortPattern.forEach(data => {
        groupByPackages[data] = tempUnsortedGroup[data]
      })
      // 
    } else {
      groupByPackages = _.groupBy(this.data, this.packageId)
    }
    const object = {}
    Object.keys(_.groupBy(this.data, 'serviceName')).forEach(key => {
      object[key] = _.groupBy(Object(_.groupBy(this.data, 'serviceName'))[key], this.packageId)
    })
    const tableData = []
    const firstRow = {}
    Object.keys(groupByPackages).forEach(packageKey => {
      firstRow[packageKey] = this.packagesData.find(packageObj => packageObj[this.packageId] == [packageKey]);
    });
    tableData.push(firstRow);
    const servicePackageDetails = Object.keys(object).map(serviceKey => {
      const commonRows = {
        serviceName: serviceKey,
        isHidden: false
      }
      Object.keys(groupByPackages).forEach(packageKey => {
        commonRows[packageKey] = {
          isActive: (object[serviceKey][packageKey]) && (object[serviceKey][packageKey]).length > 0 ? object[serviceKey][packageKey][0].activeFlag : 0,
          isAddon: (object[serviceKey][packageKey]) && (object[serviceKey][packageKey]).length > 0 ? object[serviceKey][packageKey][0].isAddon : 0
        }
      });
      return commonRows
    });
    this.ServiceRows = servicePackageDetails;
    this.FirstRow = firstRow;
    // 
    this.calculatePages();

    // Display Difference in Packages
    if (this.displayDifferenceOnly) this.showDifferenceInPackages();
  }

  ObjectToArray(obj) {
    return Object.keys(obj).map(key => obj[key])
  }

  //util related methods

  calculatePages(isLastPage?) {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const pageRatio = vw > 1336 ? 3 : vw > 1050 ? 2 : 1
    const pageNumbers = (this.packagesData.length) + (this.enableAddPackage ? 1 : 0) - pageRatio
    if (pageNumbers <= 0) {
      this.totalPage = 1;
    } else {
      this.totalPage = pageNumbers;
    }
    if (isLastPage) this.pageIndex = this.totalPage;
  }

  gotoPageNumber(pageNumb) {
    if (!this.tempDisable) {
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
      const vw20 = (20 / 100) * vw - 20
      const vw25 = (25 / 100) * vw - 22.5
      const vw34 = (34 / 100) * vw - 34
      const stepSize = vw > 1336 ? vw20 : vw > 1050 ? vw25 : vw34
      if (!this.tableParent.nativeElement) return;
      if (this.pageIndex < pageNumb) {
        this.tableParent.nativeElement.scrollLeft += (stepSize * (pageNumb - this.pageIndex));
        if (this.enablePackageSelection)
          this.btnCarousel.nativeElement.scrollLeft += (stepSize * (pageNumb - this.pageIndex));
      } else {
        this.tableParent.nativeElement.scrollLeft -= (stepSize * (this.pageIndex - pageNumb));
        if (this.enablePackageSelection)
          this.btnCarousel.nativeElement.scrollLeft -= (stepSize * (this.pageIndex - pageNumb));
      }
      this.pageIndex = pageNumb;
      this.stopBtns(600)
    }
  }


  stopBtns(limit = 300) {
    this.tempDisable = true;
    setTimeout(() => {
      this.tempDisable = false;
    }, limit);
  }

  next() {
    if (!this.tempDisable && this.pageIndex < this.totalPage) {
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
      const vw20 = ((20 / 100) * vw) - 20
      const vw25 = ((25 / 100) * vw) - 22.5
      const vw34 = ((32 / 100) * vw) - 34
      const stepSize = vw > 1336 ? vw20 : vw > 1050 ? vw25 : vw34
      if (!this.tableParent.nativeElement) return;
      if (this.enablePackageSelection) {
        if (!this.btnCarousel.nativeElement) return;
        this.btnCarousel.nativeElement.scrollLeft += (stepSize * 1);
      }
      // 
      this.tableParent.nativeElement.scrollLeft += (stepSize * 1);
      this.pageIndex += 1;
      this.stopBtns()
    }
  }

  prev() {
    if (!this.tempDisable && this.pageIndex >= 2) {
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
      const vw20 = ((20 / 100) * vw) - 20
      const vw25 = ((25 / 100) * vw) - 22.5
      const vw34 = ((32 / 100) * vw) - 34
      const stepSize = vw > 1336 ? vw20 : vw > 1050 ? vw25 : vw34
      if (!this.tableParent.nativeElement) return;
      if (this.enablePackageSelection) {
        if (!this.btnCarousel.nativeElement) return;
        this.btnCarousel.nativeElement.scrollLeft -= (stepSize * 1);
      }
      // 
      this.tableParent.nativeElement.scrollLeft -= (stepSize * 1);
      this.pageIndex -= 1;
      this.stopBtns()
    }
  }

  addNewPackage(event, ref) {
    ref.clearSelection();
    let newPackageIndexFromOptions = this.newPackageSelection.options.findIndex(option => option[this.packageId] == event.value)
    let newPackageDetail = this.newPackageSelection.options[newPackageIndexFromOptions]
    if (newPackageDetail) {
      // this.selectedPackageForNewPackageOnTable.data = null;
      this.packagesData.push(newPackageDetail)
      this.newPackageSelection.options[newPackageIndexFromOptions]["isSelected"] = true;
      this.getComparePackagesData(true);
    }
  }

  removePackageFromTable(index: number, pck: any) {
    delete this.FirstRow[pck[this.packageId]]
    this.ServiceRows.forEach(row => {
      delete row[pck[this.packageId]]
    })
    const arrayIndex = this.packagesData.findIndex(pckage => pck[this.packageId] == pckage[this.packageId])
    if (arrayIndex >= 0) this.packagesData.splice(arrayIndex, 1);
    let selectionDataPackageIndex = this.newPackageSelection.options.findIndex(option => option[this.packageId] == pck[this.packageId])
    if (selectionDataPackageIndex >= 0) this.newPackageSelection.options[selectionDataPackageIndex]['isSelected'] = false;
    this.calculatePages(this.totalPage == this.pageIndex);
    // Display Difference in Packages
    this.disableEnableToggleButton();
    this.showDifferenceInPackages();
  }

  switchOREditPackage(packageData) {
    const event = {
      type: 'switch-package',
      data: packageData
    }
    this.onButtonClick.emit(event)
  }

  get packageId() {
    return this.userMode == "sp" ? "sysPackageId" : "packageId"
  }

}
