import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardPreviewComponent } from './keyboard-preview.component';

describe('KeyboardPreviewComponent', () => {
  let component: KeyboardPreviewComponent;
  let fixture: ComponentFixture<KeyboardPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyboardPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyboardPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
