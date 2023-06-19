import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteQuestionComponent } from './complete-question.component';

describe('CompleteQuestionComponent', () => {
  let component: CompleteQuestionComponent;
  let fixture: ComponentFixture<CompleteQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompleteQuestionComponent]
    });
    fixture = TestBed.createComponent(CompleteQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
