import { Component } from "@angular/core";
@Component({
  selector: "link-list-renderer",
  templateUrl: "./link-list-renderer.component.html",
})
export class LinkListRenderer {
  // Config
  params: any;
  agInit(params: any): void {
    
    this.params = params;
    this.params.options = params.options;
    this.params.fallBackText = params.fallBackText;
    
    
  }

  get checkAllDataExists() {
    return this.params.options.some((option:any) => (option.data && option.data.length));
  }

  displayPipe(option: any) {
    const listOfOptions = this.params?.options;
    return (
      listOfOptions?.length > 1 &&
      listOfOptions[listOfOptions.length - 1].title != option.title
    );
  }
}
