import {Component, EventEmitter, Input, Output} from '@angular/core';
import { RmToastyService } from 'src/app/shared/components/rm-toasty/rm-toasty/rm-toasty.service';
import {QuerySearchService} from '../../../query-search.service';

@Component({
  selector: 'plain-value-field',
  templateUrl: './plain-value-field.component.html',
  styleUrls: ['./plain-value-field.component.scss']
})
export class PlainValueFieldComponent {

  @Input() readonly: boolean;

  @Input()
  value: any;

  @Output()
  valueChange: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  isNumber = false;

  @Input()
  maxLength: number | undefined;

  constructor(private querySearchService: QuerySearchService, private toasty: RmToastyService) {}

  get formFieldAppearance() {
    return this.querySearchService.formFieldAppearance;
  }

  copyField(value) {
    copyToClipboard(value)
    this.toasty.info("Value Copied to Clipboard")
  }

  clear() {
    this.value = null;
    this.valueChange.emit(null);
  }
}
function copyToClipboard(text) {
  var dummy = document.createElement("textarea");
  // to avoid breaking orgain page when copying more words
  // cant copy when adding below this code
  // dummy.style.display = 'none'
  document.body.appendChild(dummy);
  //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}