import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskmgrViewComponent } from './taskmgr-view.component';

describe('TaskmgrViewComponent', () => {
  let component: TaskmgrViewComponent;
  let fixture: ComponentFixture<TaskmgrViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskmgrViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskmgrViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
