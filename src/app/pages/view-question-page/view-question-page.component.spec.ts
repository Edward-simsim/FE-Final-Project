import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuestionPageComponent } from './view-question-page.component';

describe('ViewQuestionPageComponent', () => {
  let component: ViewQuestionPageComponent;
  let fixture: ComponentFixture<ViewQuestionPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewQuestionPageComponent]
    });
    fixture = TestBed.createComponent(ViewQuestionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
