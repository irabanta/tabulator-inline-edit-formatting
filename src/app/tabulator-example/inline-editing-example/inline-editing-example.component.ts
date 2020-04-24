import { Component, OnInit } from '@angular/core';
import { FormatterService } from 'src/app/tabulator/ira-tabulator/formatter.service';
import moment from 'moment';

@Component({
  selector: 'inline-editing-example',
  templateUrl: './inline-editing-example.component.html',
  styleUrls: ['./inline-editing-example.component.scss']
})
export class InlineEditingExampleComponent implements OnInit {
  checkData:any[]=[];
  columnConfig:any[]=[
    { title: "Account Number", 
      field: "accountNumber", 
      headerSort: false, 
      width: 130, 
      editor: "select", 
      formatter: this.formatterService.cellDropdownFormatter,
      formatterParams: { values: ['000111999', '000222888'] },
      editorParams: { values:  ['000111999', '000222888'] }
    },
    { title: "Check", 
      field: "checkNumber", 
      width: 120, 
      headerSort: false, 
      editor: "input",
      formatter: this.formatterService.cellInputFormatter
    },
    { title: "Amount", 
      field: "amount", 
      hozAlign: "right", 
      width: 90, 
      headerSort: false, 
      editor: "input", validator: ["numeric"], 
      formatter: this.formatterService.cellInputFormatter, 
      formatterParams:{currency:true}
    },
    { title: "Date", 
      field: "dateIssued", 
      width: 130, 
      headerSort: false, 
      editor: this.formatterService.cellDateEditor,
      formatter: this.formatterService.cellInputFormatter
    },
    { title: "Payee", 
      field: "payee", 
      width: 110, 
      headerSort: false, 
      editor: "input",
      formatter: this.formatterService.cellInputFormatter,
    },
    { title: "Paid", 
      field: "paid", 
      hozAlign: "center", 
      width: 90, 
      headerSort: false, 
      formatterParams:{field:'paid'},
      formatter: this.formatterService.cellCheckboxFormatter
    },
    { title: "Memo", 
      field: "memo", 
      hozAlign: "left", 
      width: 100, 
      headerSort: false, 
      editor: "input",
      formatter: this.formatterService.cellInputFormatter
    },
    { title: "Reason", 
      field: "reason",
      width: 117, 
      headerSort: false, 
      editor: "select",
      formatter: this.formatterService.cellDropdownFormatter,
      formatterParams: { values: ['Reason 1', 'Reason 2'] },
      editorParams: { values:  ['Reason 1', 'Reason 2']}
    }
  ];

  constructor(private formatterService: FormatterService) { }

  ngOnInit() {
    this.generateEmptyRows(8);
  }

  private generateEmptyRows(count:number){
    this.checkData.push({
      accountNumber: '000222888',
      checkNumber: '3456',
      amount: 150000,
      dateIssued: moment(new Date()).format('MM/DD/YYYY'),
      payee:'John M Williams',
      paid: true,
      memo: 'Windows',
      reason: 'Reason 2'
    });
    for(var i=1; i<count; i++){
      this.checkData.push({});
    }
  }
}
