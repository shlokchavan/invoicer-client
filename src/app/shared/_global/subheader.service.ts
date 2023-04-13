import { Injectable, TemplateRef } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { IHeaderBreadCrumb } from "../components/rm-header/rm-header.model";

@Injectable()
export class ChangeSubheaderParameterService {
    private title = new Subject<string>();
    private breadCrumb = new Subject<IHeaderBreadCrumb[]>();
    private template = new Subject<TemplateRef<any>>();

  titleObservable(): Observable<string> {
    return this.title.asObservable();
  }

  templateObservable(): Observable<TemplateRef<any>> {
    return this.template.asObservable();
  }

  customBreadCrumbObservable(): Observable<IHeaderBreadCrumb[]> {
    return this.breadCrumb.asObservable();
  }

  changeSubheaderTitle(value: string) {
    this.title.next(value);
  }

  changeSubheaderTemplate(template: TemplateRef<any>) {
      this.template.next(template)
  }

  changeCustomBreadCrumb(breadCrumb: IHeaderBreadCrumb[]) {
      this.breadCrumb.next(breadCrumb)
  }
}
