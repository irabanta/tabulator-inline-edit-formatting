import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineEditingExampleComponent } from './inline-editing-example.component';

describe('InlineEditingExampleComponent', () => {
  let component: InlineEditingExampleComponent;
  let fixture: ComponentFixture<InlineEditingExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InlineEditingExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineEditingExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
