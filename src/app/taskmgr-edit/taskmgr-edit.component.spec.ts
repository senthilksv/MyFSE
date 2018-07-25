import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskmgrEditComponent } from './taskmgr-edit.component';

describe('TaskmgrEditComponent', () => {
  let component: TaskmgrEditComponent;
  let fixture: ComponentFixture<TaskmgrEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskmgrEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskmgrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
