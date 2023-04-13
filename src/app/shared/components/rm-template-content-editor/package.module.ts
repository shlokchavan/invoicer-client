
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../shared-modules/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RMIconModule } from '../rm-icon/package.module';
import { RMButtonModule } from '../rm-button/package.module';
import { RMTemplateContentEditorComponent } from './rm-template-content-editor.component';
import { CKEditorModule } from 'ckeditor4-angular';

@NgModule({
    exports: [RMTemplateContentEditorComponent],
    declarations: [RMTemplateContentEditorComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        RMIconModule,
        RMButtonModule,
        CKEditorModule
    ]
})
export class RMTemplateContentEditorModule { }
