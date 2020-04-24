import { Injectable } from "@angular/core";
import { formatCurrency } from "@angular/common";
import moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class FormatterService {
  cellDateFormatter(cell, formatterParams){
    let dtVal = cell.getValue();
    if(dtVal)
      return moment(cell.getValue()).format("MM/DD/YYYY");
    else
      return '';
  }

  /**this is is from tabulator example */
  cellDateEditor(cell, onRendered, success, cancel, editorParams){
    //cell - the cell component for the editable cell
    //onRendered - function to call when the editor has been rendered
    //success - function to call to pass the successfuly updated value to Tabulator
    //cancel - function to call to abort the edit and return to a normal cell
    //editorParams - params object passed into the editorParams column definition property

    //create and style editor
    var editor = document.createElement("input");

    editor.setAttribute("type", "date");

    //create and style input
    //editor.style.padding = "3px";
    editor.style.width = "100%";
    editor.style.height = "100%";
    editor.style.boxSizing = "border-box";

    //Set value of editor to the current value of the cell
    editor.value = moment(cell.getValue(), "MM/DD/YYYY").format("YYYY-MM-DD")

    //set focus on the select box when the editor is selected (timeout allows for editor to be added to DOM)
    onRendered(function(){
        editor.focus();
        //editor.style.css = "100%";
    });

    //when the value has been set, trigger the cell to update
    function successFunc(){
        success(moment(editor.value, "YYYY-MM-DD").format("MM/DD/YYYY"));
    }

    editor.addEventListener("change", successFunc);
    editor.addEventListener("blur", successFunc);

    //return the editor element
    return editor;
};

  cellCheckboxFormatter(cell, formatterParams, onRendered){
    var cellValue = cell.getValue();
    var rowData = cell.getRow().getData();
    var label = document.createElement('label');
    label.className='checkbox-container';
    var checkbox = document.createElement('input');
    checkbox.type='checkbox';
    checkbox.className = 'cell-checkbox'
    checkbox.checked = cellValue===true;
    
    checkbox.addEventListener("click", function(arg){
        rowData[formatterParams.field]=checkbox.checked;
        //console.log(checkbox.checked);
        if(formatterParams.handler){
          formatterParams.handler(cell, formatterParams); //callback
        }
    });
    //=======================NO EDITING=========================
    if(formatterParams && formatterParams.editable){
      if(formatterParams.editable===false || rowData[formatterParams.editable]===true){
        checkbox.setAttribute('disabled', 'disabled');
      }
    }
    //===========================================================
    
    label.appendChild(checkbox);
    var span = document.createElement('span');
    span.className = 'checkmark';
    label.appendChild(span);
    return label;
  }

  cellDropdownFormatter(cell, formatterParams, onRendered){
    var value = cell.getValue();
    var rowData = cell.getRow().getData();
    //==================NO EDITING============================
    if(formatterParams && formatterParams.editable){
      if(formatterParams.editable==false || rowData[formatterParams.editable]===false){
        return value;
      }
    }
    //=======================================================
    cell.getElement().style.padding='1px!important';
    var div = document.createElement('div');
    div.className='select-dropdown inline-editor-select';
    var select = document.createElement('select');
    select.className = 'form-control';
    div.appendChild(select);
    var icon = document.createElement('i');
    icon.className = 'adl-chevron-down';
    div.appendChild(icon);

    //default option
    let optDef = document.createElement('option');
    optDef.innerHTML = '--select--';
    optDef.value = '';
    select.appendChild(optDef);

    if(formatterParams && (formatterParams.values||[]).length){
      for(var i=0; i<formatterParams.values.length; i++){
        //console.log(formatterParams.values[i]);
        let opt = document.createElement('option');
        opt.innerHTML = formatterParams.values[i];
        opt.value = formatterParams.values[i];
        select.appendChild(opt);
      }
    }

    if((value || '')==='') {
      //todo
    }
    else{
      for(var x =0; x<select.options.length; x++){
        let opt = select.options[x];
        if(opt.value == value) opt.selected=true;
      }
    }
    return div;
  }

  cellInputFormatter(cell, formatterParams, onRendered){
    var value = cell.getValue();
    cell.getElement().style.padding='1px!important';
    var span = document.createElement('label');
    span.className = 'inline-editor-text'
    if((value || '')==='') {
      span.innerText='';
      span.style.fontWeight= 'Bold';
    }
    else{
      if(formatterParams && formatterParams.currency)
      {
          let tempValue = '';
          if(value && value>0){
              tempValue = formatCurrency(value, 'en-US', '$', 'USD');  
          }
          else if(value<0){
              tempValue = '(' + formatCurrency(Math.abs(value), 'en-US', '$', 'USD') + ')';
          }
          else{
              tempValue = '';
          }
          span.innerText = tempValue;
      }
      else{
        span.innerText = value;
      }
    }
    return span;
  }

  cellButtonFormatter(cell:any, formatterParams:any) {
    var value = cell.getValue();
    if (!formatterParams.buttonTitle) {
      value = formatterParams.buttonTitle;
    }
    
    var btn = document.createElement('button');
    btn.className = 'inline-editor-lookup-button'
    btn.innerHTML = value;
    if(formatterParams && formatterParams.lookupCallback){
      btn.addEventListener("click", function(arg){
          formatterParams.lookupCallback(cell, formatterParams);
      });
    }
    return btn;
  }

     
}
