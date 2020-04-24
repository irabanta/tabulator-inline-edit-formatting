import { Component, OnInit, SimpleChanges, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import Tabulator from 'tabulator-tables';

@Component({
  selector: 'ira-tabulator',
  templateUrl: './ira-tabulator.component.html',
  styleUrls: ['./ira-tabulator.component.scss']
})
export class IraTabulatorComponent implements OnChanges {
    table = document.createElement('div');
    @Input() data:any[];
    @Input() childrenField:string='_children';
    @Input() columns: any[];
    @Input() height?:number;
    @Input() minHeight?:number;
    @Input() maxHeight?:number;
    @Input() pagination?:string;
    @Input() paginationSize?:number;
    @Input() selectable?:boolean=false; //set to true if you want to show row hover and pointer
    @Input() canvasid:string='ira-tabulator-table';
    @Input() treeExpanded:any=true;
    @Input() consumerObject?:any;
    @Input()
    public cellEditedCallback: Function; 
    @Input()
    public rowFormatterCallback?: Function;
    
    tableGrid:any;
    
    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        this.configureTable();
    }

    configureTable(){
        this.tableGrid = new Tabulator(this.table, {
            persistentLayout: false,
            data: this.data,
            columns: this.columns,
            layout: 'fitDataFill',
            height:this.height,
            minHeight: this.minHeight,
            maxHeight: this.maxHeight,
            dataTree:true,
            dataTreeStartExpanded:this.treeExpanded,
            dataTreeChildField:this.childrenField,
            pagination:this.pagination,
            paginationSize: this.paginationSize,
            selectable: this.selectable,
            rowFormatter: this.rowFormatterCallback,
            cellEdited:this.cellEditedCallback||function(cell){},
        });
        //cleanup the canvas
        var e = document.getElementById(this.canvasid);
        var child = e.lastElementChild;  
        while (child) { 
            e.removeChild(child); 
            child = e.lastElementChild; 
        } 
        //=============
        document.getElementById(this.canvasid).appendChild(this.table);

        this.tableGrid.callingInstance = this.consumerObject;
      //in Edge or in FF, a lengthy grid is half cut. it renders by zoom in our out.
      //let grid redraw to fix
      this.tableGrid.redraw();
    }

    redraw(){
        this.tableGrid.redraw();
    }

    getRows():any[]{
        return this.tableGrid.getRows();
    }

    addRow(row : any) {
      return this.tableGrid.addRow(Object.assign({}, row));
    }

    beginFilter(parameters: any[]) {
        if(this.tableGrid)
        {
            (<any>this.tableGrid).setFilter(parameters);
        }
    }

    clearFilter(){
      if(this.tableGrid)
        {
            (<any>this.tableGrid).setFilter([]);
        }
    }

}

