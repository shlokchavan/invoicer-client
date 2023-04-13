import { Component } from "@angular/core";
import { convertAmountToMilliion } from "src/app/shared/utils/converting-amount-millions";
@Component({
    selector: 'currency-renderer',
    templateUrl: './currency-renderer.component.html'
})
export class CurrencyRenderer {
    // Config
    currrencyConfig = {
        currencyCode: 'USD'
    }
    params: any;
    agInit(params: any): void {
        // 
        this.params = params;
        this.currrencyConfig.currencyCode = this.params.currencyCode; //Current Value
        this.params.value = this.amountFormatter(this.params.value)
    }

    amountFormatter(value: any) {
        return convertAmountToMilliion(value)
    }
}
