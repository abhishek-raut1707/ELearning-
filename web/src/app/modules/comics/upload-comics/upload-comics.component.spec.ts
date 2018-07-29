import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadComicsComponent } from './upload-comics.component';

describe('UploadComicsComponent', () => {
  let component: UploadComicsComponent;
  let fixture: ComponentFixture<UploadComicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadComicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadComicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
