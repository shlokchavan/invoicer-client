import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import * as _ from 'lodash';
import { IRMSelectionListConfig } from './rm-selection-list.model';

@Component({
    selector: 'rm-selection-list',
    templateUrl: './rm-selection-list.component.html',
    styleUrls: ['./rm-selection-list.component.scss']
})
export class RMSelectionListComponent {

    // Params
    @Input() config!: IRMSelectionListConfig | any;
    @Input() listOptions!: any[];
    @Input() selectedItems: any = []
    @Output() selectedItemsChange: EventEmitter<any[]> = new EventEmitter();

    // Variables
    internalModel = {
        search: null,
        showToggle: false
    }
    preservedSelectedList = [];
    get filteredList() {
        return !this.internalModel.search ? 
        ( 
          this.internalModel.showToggle ? 
          this.listOptions.filter((item: any) => this.selectedItems.includes(this.config ? item[this.config.returnKey || this.config.labelKey]! : item)) :
          this.listOptions
        ) : 
        this.filterByValue(
            (this.internalModel.showToggle ? 
            this.listOptions.filter(item => this.selectedItems.includes(this.config ? item[this.config.returnKey || this.config.labelKey] : item)) :
            this.listOptions)
        ,this.internalModel.search)
    }

    // Configs
    internalConfig = {
        search: {
            fieldKey: "search",
            attributes: {
              isSmall: true,
              placeholder: "Search ",
              isMandatory: false,
              prefixIcon: "search",
              iconSize: "small",
              class: "center",
            }
        },
        showSelectedToggle: {
            isActive: this.internalModel.showToggle,
            attributes: {
              disable: false,
              label: `Show Selected`,
            },
        }
    }

    constructor() {

    }

    isItemSelect(option: any) {
        // 
        return this.selectedItems.includes(option)
    }
    
    setAll(checked: any) {
        if(checked) {
            this.selectedItems = _.clone(this.listOptions.map(item => item[this.config.returnKey || this.config.labelKey]))
        } else {
            this.selectedItems = []
        }
        if(this.selectedItems.length == 0) {
            this.internalModel.showToggle = false
            this.internalConfig.showSelectedToggle.isActive = false
        }
        this.selectedItemsChange.emit(this.selectedItems)
    }

    selectItem(event: any) {
        if(event.option.selected) {
            this.selectedItems.push(event.option.value)
        } else {
            const removeIndex = this.selectedItems.findIndex((item: any) => item == event.option.value);
            if(removeIndex != undefined)
            this.selectedItems.splice(removeIndex, 1);
        }
        if(this.selectedItems.length == 0) {
            this.internalModel.showToggle = false
            this.internalConfig.showSelectedToggle.isActive = false
        }
        this.selectedItemsChange.emit(this.selectedItems)
    }

    filter(event: any) {
        // this.selectedItems = _.clone(this.preservedSelectedList)
    }

    filterByValue(array: any, string: any) {
        return array.filter((o: any) =>
            Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
    }

    toggleShowSelected(event: any) {
        this.internalModel.showToggle = event.isActive;
    }
}
