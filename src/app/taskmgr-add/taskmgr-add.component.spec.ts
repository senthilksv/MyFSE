import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskmgrAddComponent } from './taskmgr-add.component';

describe('TaskmgrAddComponent', () => {
  let component: TaskmgrAddComponent;
  let fixture: ComponentFixture<TaskmgrAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskmgrAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskmgrAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
