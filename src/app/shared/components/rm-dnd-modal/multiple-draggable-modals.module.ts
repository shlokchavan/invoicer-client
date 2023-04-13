import { NgModule } from '@angular/core';
import { DNDModalsComponent } from './rm-dnd-modal.component';
import { RMModalComponent } from './modal.component';

@NgModule({
  imports: [
  ],
  declarations: [DNDModalsComponent, RMModalComponent],
  exports: [DNDModalsComponent],
  entryComponents: [RMModalComponent]
})
export class RMMultipleDraggableModalsModule { }
