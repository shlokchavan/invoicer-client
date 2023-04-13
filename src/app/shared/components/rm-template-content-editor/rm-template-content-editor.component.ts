
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { CKEditorComponent } from 'ckeditor4-angular';
import { _AddTemplateConfig } from 'src/app/configs/plugin-components/manage-templates/add-template.config';

declare const CKEDITOR;

@Component({
  selector: 'rm-template-content-editor',
  templateUrl: './rm-template-content-editor.component.html',
  styleUrls: ['./rm-template-content-editor.component.scss']
})
export class RMTemplateContentEditorComponent implements OnInit, OnChanges {

  @Input() PLACEHOLDERS: any[]
  @Input() noSubject: boolean;
  @Input() onlyTextArea: boolean;
  @Input() isResetAction: boolean;
  @Input() showVariableActions: boolean;
  @Input() showRestoreButton: boolean;
  @Output() onReady: EventEmitter<any> = new EventEmitter()
  @Output() onChange: EventEmitter<any> = new EventEmitter()
  @Output() onActionClick: EventEmitter<any> = new EventEmitter()

  // Configs
  baseConfigClass = new _AddTemplateConfig()
  editorInputConfig: any;
  editorConfig: any;

  // Variables
  @Input() subject: string;
  @Output() subjectChange: EventEmitter<string> = new EventEmitter();
  @Input() body: string;
  @Output() bodyChange: EventEmitter<string> = new EventEmitter();
  @ViewChild('editor') editor: CKEditorComponent;
  searchVar: string;
  editorLoader: boolean = false;

  constructor() {
    // Default
    this.showVariableActions = true;
    this.showRestoreButton = false;
    // Setup Configs
    this.editorInputConfig = {
      ...this.baseConfigClass.contentInputEditor,
      on: this.createAutoComplete
    }
    this.noSubject = false;
    // setInterval(()=> {
    //   
    // },1000)
  }

  ngOnInit(): void {
    // Setup Configs
    // this.editorLoader = true;
    this.editorConfig = {
      ...( this.onlyTextArea ? this.baseConfigClass.contentEditorTextArea : this.baseConfigClass.contentEditor),
      on: this.createAutoComplete
    }
  }

  ngOnChanges(ev) {
    // On Changes
  }

  get searchedVariableList() {
    if(this.searchVar == "" || !this.searchVar) {
      return this.PLACEHOLDERS;
    } else {
      return this.PLACEHOLDERS.filter((placholder) => {
        return Object.keys(placholder).some(k => {
          placholder[k] = (placholder[k] as string);
          if(typeof placholder[k] == "string")
            return (placholder[k] as string)?.toLowerCase().includes(this.searchVar?.toLowerCase())
          else return false
        })
      })
    }
  }


  updateBody(event) {
    setTimeout(() => {
      this.bodyChange.emit(this.body);
      this.onChange.emit({body: this.body, subject: this.subject});
    }, 100);
    
  }

  updateSubject(event) {
    setTimeout(() => {
      this.subjectChange.emit(this.subject);
      this.onChange.emit({body: this.body, subject: this.subject});
    }, 100);
    
  }


  // Setup Variable Placeholder.
  get createAutoComplete() {
    return {
      instanceReady: (evt) => {
        this.ready();
        setTimeout(() => {
          this.editorLoader = false;
        }, 500);
        const mainContainer = document.getElementById( 'cke_' + evt.editor.name )
        var itemTemplate = '<li data-id="{id}">' +
            "<div style='display: flex; align-items: center; justify-content: space-between; height: 24px; width: 100%'><b class='item-title'>{name}</b> <span style='color: #006a99; font-size: 16px' title='{description}' class='svg_icon rm-icon_info'></span></div>" +
            '</li>',
            outputTemplate = '[[{name}]] ';

          var autocomplete = new CKEDITOR.plugins.autocomplete(evt.editor, {
            textTestCallback: this.textTestCallback.bind(this),
            dataCallback: this.dataCallback.bind(this),
            itemTemplate: itemTemplate,
            outputTemplate: outputTemplate
          });

          autocomplete.getHtmlToInsert = function(item) {
            return this.outputTemplate.output(item);
          };
          evt.editor.on('focus',function(ev){
            mainContainer.classList.add("focused")
          });
          evt.editor.on('blur',function(ev){
            mainContainer.classList.remove("focused")
          });
      }
    }
  }


  ready() {
    const variableList = document.querySelectorAll(".variableSelector li");
    variableList.forEach((element,index) => {
        element.addEventListener("dragstart", (e: any) => {
          // e.dataTransfer.setDragImage(e.target,0,0);
          e.dataTransfer.dropEffect = "copy";
          e.dataTransfer.effectAllowed = "copy"
          const variableName = this.PLACEHOLDERS[index]
          let varHtml = "[[" +variableName.name + "]] "
          
            e.dataTransfer.setData("text", varHtml);
      });
    });
  }

  
textTestCallback(range) {
  if (!range.collapsed) {
    return null;
  }
  return CKEDITOR.plugins.textMatch.match(range, this.matchCallback);
}

matchCallback(text, offset) {
  var pattern = /\[{2}([A-z]|\])*$/,
    match = text.slice(0, offset)
    .match(pattern);

  if (!match) {
    return null;
  }

  return {
    start: match.index,
    end: offset
  };
}

dataCallback(matchInfo, callback) {
  var data = this.PLACEHOLDERS.filter(function(item) {
    var itemName = '[[' + item.name + ']]';
    return itemName.indexOf(matchInfo.query.toLowerCase()) == 0;
  });

  callback(data);
}

  editorAction(event) {
    this.onActionClick.emit(event)
  }


}
