import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchresComponent } from './searchres.component';

describe('SearchresComponent', () => {
  let component: SearchresComponent;
  let fixture: ComponentFixture<SearchresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
