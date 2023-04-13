import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AgGridModule } from "ag-grid-angular";
import { RMGridComponent } from "./rm-grid.component";
import { RMGridService } from "./rm-grid.service";
import { ActionRenderer } from "./custom-renderer/action-renderer/action-renderer.component";
import { RMIconModule } from "../../rm-icon/package.module";
import { LinkRenderer } from "./custom-renderer/link-renderer/link-renderer.component";
import { CheckboxRenderer } from "./custom-renderer/checkbox-renderer/checkbox-renderer.component";
import { RMCheckboxModule } from "../../rm-checkbox/package.module";
import { InfoRenderer } from "./custom-renderer/info-renderer/info-renderer.component";
import { RMTooltipModule } from "../../rm-tooltip/tooltip.module";
import { MultiRenderer } from "./custom-renderer/multi-renderer/multi-renderer.component";
import { IconRenderer } from "./custom-renderer/icon-renderer/icon-renderer.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RMSelectBoxModule } from "../../rm-select-box/package.module";
import { RMButtonModule } from "../../rm-button/package.module";
import { GridHeaderComponent } from "./grid-header/grid-header.component";
import { SelectEditor } from "./custom-editor/select-editor/select-editor.component";
import { MaterialModule } from "src/app/shared/shared-modules/material.module";
import { InputEditor } from "./custom-editor/input-editor/input-editor.component";
import { GridChipComponent } from "./custom-component/grid-chip/grid-chip.component";
import { RMChipsModule } from "../../rm-chip/package.module";
import { RMToggleButtonsModule } from "../../rm-button-toggle/package.module";
import { CurrencyRenderer } from "./custom-renderer/currency-renderer/currency-renderer.component";
import { CheckboxEditor } from "./custom-editor/checkbox-editor/checkbox-editor.component";
import { RMToggleModule } from "../../rm-toggle/package.module";
import { CustomLoadingOverlay } from "./custom-overlay/custom-loading-overlay.component";
import { RMLoaderModule } from "../../rm-loader/package.module";
import { RMCardViewListModule } from "../../rm-cardview-list/package.module";
import { RadioButtonRenderer } from "./custom-renderer/radio-button-renderer/radio-button-renderer.component";
import { RMInputModule } from "../../rm-input/package.module";
import { ExcelService } from "src/app/shared/_global/export.service";
import { ColorBoxRenderer } from "./custom-renderer/color-box-renderer/color-box-renderer.component";
import { IconTextRenderer } from "./custom-renderer/icontext-renderer/icontext-renderer.component";
import { LinkListRenderer } from "./custom-renderer/link-list-renderer/link-list-renderer.component";
import { MatMenuModule } from "@angular/material/menu";
import { HtmlRenderer } from "./custom-renderer/html-renderer/html-renderer.component";
import { ListRenderer } from "./custom-renderer/list-renderer/list-renderer.component";
import { ChipRendererComponent } from "./custom-renderer/chip-renderer/chip-renderer.component";
// import { ChartsModule } from "ng2-charts";
import { CustomColumnHeader } from "./custom-component/custom-column-header/custom-column-header.component";
import { BoldTextRenderer } from "./custom-renderer/bold-text-renderer/bold-text-renderer.component";
import { ThemeService } from "src/app/shared/_global/theme.service";
import { SelectSearchPipe } from "./custom-editor/select-editor/select-search.pipe";
import { GridGlobalFilterComponent } from './grid-global-filter/grid-global-filter.component';
import { RMDrawerPanelModule } from "../../rm-drawer-panel/src/package.module";
import { RMSelectionListModule } from "../../rm-selection-list/package.module";
import { ChipCounterRendererComponent } from "./custom-renderer/chip-counter-renderer/chip-counter-renderer.component";
import { IconTextLinkRenderer } from "./custom-renderer/icon-text-link-renderer/icon-text-link-renderer.component";
import { ValidationStatusRenderer } from "./custom-renderer/validation-status-renderer/validation-status-renderer.component";
import { ValidationIssueRenderer } from "./custom-renderer/validation-issue-renderer/validation-issue-renderer.component";
import { RadioInputEditor } from "./custom-editor/radio-input-editor/radio-input-editor.component";
import { NgChartsModule } from "../../ng2-charts/src/lib/ng-charts.module";

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RMIconModule,
    RMCheckboxModule,
    RMSelectBoxModule,
    RMButtonModule,
    RMTooltipModule,
    MaterialModule,
    RMChipsModule,
    RMToggleButtonsModule,
    RMToggleModule,
    RMLoaderModule,
    RMInputModule,
    MatMenuModule,
    // Grid View
    RMCardViewListModule,
    NgChartsModule,
    RMDrawerPanelModule,
    RMSelectionListModule,
    // Tooltip for Badge
    AgGridModule.withComponents([
      // Editor
      InputEditor,
      SelectEditor,
      CheckboxEditor,
      RadioInputEditor,
      ChipRendererComponent,

      // Overlays
      CustomLoadingOverlay,
    ]),
  ],
  exports: [RMGridComponent],
  declarations: [
    RMGridComponent,
    ActionRenderer,
    LinkRenderer,
    CheckboxRenderer,
    InfoRenderer,
    MultiRenderer,
    IconRenderer,
    CurrencyRenderer,
    RadioButtonRenderer,
    ColorBoxRenderer,
    IconTextRenderer,
    LinkListRenderer,
    IconTextLinkRenderer,
    HtmlRenderer,
    ListRenderer,
    BoldTextRenderer,

    // Editors
    SelectEditor,
    InputEditor,
    CheckboxEditor,
    RadioInputEditor,

    // AddOn Component
    GridHeaderComponent,

    // Custom Header (Icon)
    CustomColumnHeader,


    // Overlay
    CustomLoadingOverlay,

    //chip renderer
    ChipRendererComponent,

    // chip count renderer
    ChipCounterRendererComponent,

    // Validation status renderer
    ValidationStatusRenderer,

    // Validation Issue renderer
    ValidationIssueRenderer,

    // Search select for inline grid
    SelectSearchPipe,

    GridGlobalFilterComponent,
  ],
  providers: [RMGridService, ExcelService, ThemeService],
  entryComponents: [
    ActionRenderer,
    LinkRenderer,
    CheckboxRenderer,
    InfoRenderer,
    MultiRenderer,
    IconRenderer,
    CurrencyRenderer,
    RadioButtonRenderer,
    ColorBoxRenderer,
    LinkListRenderer,
    IconTextLinkRenderer,
    HtmlRenderer,
  ],
})
export class RMGridModule {}
