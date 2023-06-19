import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyPostsComponent } from './view-my-posts.component';

describe('ViewMyPostsComponent', () => {
  let component: ViewMyPostsComponent;
  let fixture: ComponentFixture<ViewMyPostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewMyPostsComponent]
    });
    fixture = TestBed.createComponent(ViewMyPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
