import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipQueueComponent } from './clip-queue.component';

describe('ClipQueueComponent', () => {
  let component: ClipQueueComponent;
  let fixture: ComponentFixture<ClipQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClipQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClipQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
