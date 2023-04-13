import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../shared-modules/material.module';
import { RMIconModule } from '../rm-icon/package.module';
import { CommonModule } from '@angular/common';
import { RMFileUploaderComponent } from './rm-file-uploader/rm-file-uploader.component';
import { RMBulkImporterComponent } from './rm-bulk-importer/rm-bulk-importer.component';
import { BulkDataMapperComponent } from './bulk-data-mapper/bulk-data-mapper.component';
import { DndDirective } from './dnd.directive';
import { RMModalModule } from '../rm-modal/package.module';


@NgModule({
  exports: [RMFileUploaderComponent, RMBulkImporterComponent, DndDirective],
  declarations: [RMFileUploaderComponent, RMBulkImporterComponent, BulkDataMapperComponent, DndDirective],
  imports: [
    CommonModule,
    MaterialModule,
    RMIconModule,
    RMModalModule,
  ]
})
export class RMUploaderModule { }
