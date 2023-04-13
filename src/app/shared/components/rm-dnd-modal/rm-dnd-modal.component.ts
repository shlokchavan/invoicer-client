import { Component, ViewChild, ComponentFactoryResolver, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { RMModalComponent } from './modal.component';

@Component({
  selector: 'rm-dnd-modal',
  template: `<ng-template #modalsContainer></ng-template>`
})
export class DNDModalsComponent {
  @Output() onActionClicked: EventEmitter<any> = new EventEmitter();
  @ViewChild('modalsContainer', { read: ViewContainerRef }) container;    
  Component;
  ModalsArray:any = [];

  constructor(private componentFactoryResolver:ComponentFactoryResolver) { 
    this.Component = RMModalComponent;
  }

  AddModal(modalName="", componentType, data:any = {}, backdrop = false, escape = false, animation = true, center = true, position:{Bottom:string, Right:string} = {Bottom:"10%", Right:"10%"}) {
    // Create component 
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.Component);
    const component = this.container.createComponent(componentFactory);
    //Set component data
    var uniqueID = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
    component.instance.uniqueID = uniqueID;
    component.instance.Self = component;
    component.instance.Component = componentType;
    component.instance.Data = data;
    component.instance.Center = center;
    component.instance.Position = position;
    component.instance.ModalBackdrop = backdrop;
    component.instance.ModalEscape = escape;
    component.instance.Animation = animation;
    component.instance.onActionClicked = this.onActionClicked;
    
    //add to modals array
    this.ModalsArray.push({Name:modalName, Id:uniqueID});

    //returns the modal uniqueID for future use.
    return uniqueID;
  }

  RemoveModal(modalId){
    (<HTMLElement>(document.getElementById("modal-" + modalId).getElementsByClassName("close")[0])).click();
  }

  RemoveModalFromArray(modalId){
    for (var i = this.ModalsArray.length - 1; i >= 0; --i) {
      if (this.ModalsArray[i].Id == modalId) {
        this.ModalsArray.splice(i,1);
      }
    } 
  }

  RemoveAll() {
    this.container.clear();
    this.ModalsArray = [];
  }

}
