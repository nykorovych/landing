import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NaArticlListComponent } from './na-articl-list.component';

describe('NaArticlListComponent', () => {
  let component: NaArticlListComponent;
  let fixture: ComponentFixture<NaArticlListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NaArticlListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NaArticlListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
