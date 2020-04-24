import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IraTabulatorComponent } from './ira-tabulator.component';

describe('IraTabulatorComponent', () => {
  let component: IraTabulatorComponent;
  let fixture: ComponentFixture<IraTabulatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IraTabulatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IraTabulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
