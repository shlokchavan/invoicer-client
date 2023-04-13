import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ChipRendererService {
  private isEditMode$: BehaviorSubject<any> = new BehaviorSubject('cancel');
  // private isEditMode$: BehaviorSubject<'edit' | 'save' | 'cancel'> = new BehaviorSubject('cancel');
  // private optionsData$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private optionsData$: BehaviorSubject<any> = new BehaviorSubject([]);
  isEditMode = this.isEditMode$.asObservable();
  optionsData = this.optionsData$.asObservable();
  constructor() {}

  changeEditMode(toggleValue: 'edit' | 'save' | 'cancel') {
    this.isEditMode$.next(toggleValue);
  }

  setOptions(values: any[]) {
    this.optionsData$.next(values);
  }

  
}
