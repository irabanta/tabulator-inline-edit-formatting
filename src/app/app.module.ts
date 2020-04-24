import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IraTabulatorComponent } from './tabulator/ira-tabulator/ira-tabulator.component';
import { InlineEditingExampleComponent } from './tabulator-example/inline-editing-example/inline-editing-example.component';

@NgModule({
  declarations: [
    AppComponent,
    IraTabulatorComponent,
    InlineEditingExampleComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
