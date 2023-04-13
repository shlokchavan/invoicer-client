import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { convertAmountToMilliion } from "../../utils/converting-amount-millions";

@Component({
  selector: "rm-highlight-card",
  templateUrl: "./rm-highlight-card.component.html",
  styleUrls: ["./rm-highlight-card.component.scss"],
})
export class RmHighlightCardComponent implements OnInit, OnChanges {
  @Input() title: string;
  @Input() data: any[] | string[];
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.data) {
      this.convertTextToHTML();
    }
  }

  convertTextToHTML() {
    this.data.forEach((element: any) => {
      const values = element.categoryValue.split(",");
      let wordsplit: any[] = element.categoryDescription.split(" ");
      let foundVariableIndex: number = -1; // Not Found Yet
      wordsplit.forEach((word: string, idx: number) => {
        if (word.endsWith("]")) {
          foundVariableIndex++;
          if (word.startsWith("[")) {
            // Normal Variable (make bold)
            wordsplit[
              idx
            ] = `<span class="bold-text">${values[foundVariableIndex]}</span>`;
          } else if (word.startsWith("$")) {
            // Currency Variable (make orange)
            wordsplit[
              idx
            ] = `<span class="amount-text">${convertAmountToMilliion(
              values[foundVariableIndex]
            )}</span>`;
          }
        }
      });
      // Assign converted values to description
      element.categoryDescription = wordsplit.join(" ");
    });
  }
}
