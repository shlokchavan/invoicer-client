import { Component } from "@angular/core";
import * as _ from "lodash";
import { RMGridComponent } from "../../rm-grid.component";
@Component({
  selector: "some-selector",
  templateUrl: "./action-renderer.component.html",
  styleUrls: ["./action-renderer.component.scss"],
})
// implements ICellRendererAngularComp
/*
    gridApi.applyTransaction({ remove: rowArray });  | Delete    
    gridApi.applyTransaction({ update: rowArray }); | Edit/ Update
    gridApi.applyTransaction({ add: rowArray }); | Add
*/
export class ActionRenderer {
  isEditing!: boolean;
  params!: any;
  actions!: any[];
  tempActions!: [];
  grid!: RMGridComponent;
  currentRow: any; // Temp Storing for Reset
  agInit(params: any): void {
    // 
    this.params = params;
    this.currentRow = _.cloneDeep(this.params.data);
    this.actions = this.tempActions = this.params.actions;
    this.grid = this.params.context.componentParent;
    this.isEditing = this.params.isEditing || params.isEditing;
    this.toggleActions();
    const instances = this.params.api.getCellEditorInstances();
    // If Renderer Recall then keep old rows intact.
    if(instances.length > 0 && instances[0].params.rowIndex == this.params.rowIndex) {
      this.actions = this.tempActions.filter(
        (item: any) => item.mode != "view"
      );
    }
    else if (instances && this.params.data?.state == undefined) {
      this.actions = this.tempActions.filter(
        (item: any) => item.mode == "view"
      );
    } else if(instances && this.params.data?.state == "new") {
      this.actions = this.tempActions.filter(
        (item: any) => item.mode != "view"
      );
    }
    this.grid.gridComp.rowEditingStopped.subscribe((response) => {
      // if(this.isEditing) {
      //     this.isEditing = false
      //     this.toggleActions();
      //     this.params.api.stopEditing(true);
      //     this.removeNewCancelledRow();
      // }
    });
    // setTimeout(()=> {
    //     Object.keys(this.grid.gridApi.detailGridInfoMap).forEach(element => {
    //         const detailGridApi = this.grid.gridApi.detailGridInfoMap[element];
    //         if(detailGridApi) {
    //             detailGridApi.api.
    //         }
    //     });
    // },500)
  }

  toggleActions() {
    if (this.isEditing) {
      this.actions = this.tempActions.filter(
        (item: any) => item.mode == "editing"
      );
    } else {
      this.actions = this.tempActions.filter(
        (item: any) => item.mode == "view"
      );
    }
  }

  doEdit() {
    if (!this.isEditing) {
      this.isEditing = true;
      this.grid.isEditing = true;
      this.toggleActions();
      const editColKey = this.params.api.columnModel.columnDefs[1].field; // Get 2nd Column FieldKey
      this.params.api.startEditingCell({
        rowIndex: this.params.node.rowIndex,
        colKey: editColKey,
      });
    }
  }

  doCancel(isSaved: boolean = true) {
    this.grid.isEditing = false;
    this.isEditing = false;
    this.toggleActions();
    this.params.api.stopEditing(isSaved);
    this.params.node.setData(this.currentRow);
    // restore previous data or reload
    this.removeNewCancelledRow(isSaved);
  }

  removeNewCancelledRow(isSaved: boolean = true) {
    const newState =
      this.params.node.data.state && this.params.node.data.state == "new";
    if (newState && isSaved) {
      this.params.api.applyTransaction({
        remove: [this.params.node.data],
      });
    }
  }

  doSave() {
    this.grid.isEditing = false;
    this.isEditing = false;
    this.doCancel(false); //Save New Value
  }

  doDelete() {
    this.isEditing = false;
    this.grid.isEditing = false;
    this.params.api.stopEditing(false);
  }

  btnClicked(type: string) {
    // Parent Grid Full Row Edit
    if (this.grid.config && this.grid.config.editType === "fullRow") {
      // Full Row Edit
      switch (type) {
        case "edit":
          this.doEdit();
          break;
        case "delete":
          this.doDelete();
          break;
        case "save":
          this.doSave();
          break;
        case "cancel":
          this.doCancel();
          break;
        default:
          break;
      }
      // Child Grid Full Row Edit
    } else if (
      this.grid.config &&
      this.grid.config.gridOptions.detailCellRendererParams
    ) {
      if (
        this.grid.gridOptions.detailCellRendererParams.detailGridOptions
          .editType == "fullRow" &&
        !this.params.node.master
      ) {
        // Full Row Edit
        switch (type) {
          case "edit":
            this.doEdit();
            break;
          case "delete":
            this.doDelete();
            break;
          case "save":
            this.doSave();
            break;
          case "cancel":
            this.doCancel();
            break;
          default:
            break;
        }
        // 
      }
    }
    // Send Action To Parent/ Scope Component
    this.params["type"] = type;
    // 
    this.grid.onActionClicked(this.params);
  }

  validationCheck(action: any) {
    let isValidated = true;
    if (action == "save") {
      const instances = this.params.api.getCellEditorInstances();
      if (instances) {
        instances.forEach((instance: any) => {
          // 
          // const editor = instance.getFrameworkComponentInstance();
          //Required Validation Check
          if (
            instance.params.isRequired &&
            !this.requiredValidation(instance.value)
          ) {
            isValidated = false;
          }
        });
      }
    }
    return isValidated;
  }

  requiredValidation(value: any) {
    if (value && value != "") return true;
    else return false;
  }
}
