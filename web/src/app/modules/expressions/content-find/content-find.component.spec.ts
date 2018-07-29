import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentFindComponent } from './content-find.component';

describe('ContentFindComponent', () => {
  let component: ContentFindComponent;
  let fixture: ComponentFixture<ContentFindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentFindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
