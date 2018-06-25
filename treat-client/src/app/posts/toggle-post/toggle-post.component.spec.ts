import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TogglePostComponent } from './toggle-post.component';

describe('TogglePostComponent', () => {
  let component: TogglePostComponent;
  let fixture: ComponentFixture<TogglePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TogglePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TogglePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
