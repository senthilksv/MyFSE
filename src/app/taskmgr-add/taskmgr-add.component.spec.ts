import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskmgrAddComponent } from './taskmgr-add.component';
import { SharedService } from '../shared.service';
import { MockSharedService } from '../mock-shared-service';
import { Observable } from '../../../node_modules/rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { FormsModule }   from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskDetail } from '../Models/taskDetail';
import { Router,ActivatedRoute} from '@angular/router';

describe('TaskmgrAddComponent', () => {
  let component: TaskmgrAddComponent;
  let fixture: ComponentFixture<TaskmgrAddComponent>;
  let service : SharedService; 
  
  const TASK_DETAILS : any[] = [{ "id": 1, "name": "Task 1", "startDate": Date.now, 
"endDate" :Date.now, "priority":10, 
    "endTask":false, "parentId":2, "parentName":"parent" },
    { "id": 2, "name": "Task 2", "startDate": Date.now, "endDate" :Date.now, "priority":10, "endTask":true, "parentId":2, "parentName":"parent" }
  ];

  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule],
      declarations: [ TaskmgrAddComponent ] , 
      providers: [
        {provide: SharedService, useClass: MockSharedService},
        { provide: Router, useValue: mockRouter}
      ]
    })    
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskmgrAddComponent);
    component = fixture.componentInstance;
    service = TestBed.get(SharedService);
   //spyOn(service,'GetAllTasks').and.returnValues(Observable.of(TASK_DETAILS))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    //expect('Task Manager').toBe(component.title)
  });

  it('should return Task details', () =>
  {
    spyOn(service,'GetAllTasks').and.returnValues(Observable.of(TASK_DETAILS));
    component.ngOnInit();
    expect(1).toBe(component.taskDetails.length);
    expect("Task 1").toBe(component.taskDetails[0].name);
  });

  it('Add should return Success', () =>
  {
    component.taskDetail = new TaskDetail();
    spyOn(service,'AddTask').and.returnValue(Observable.of("SUCCESS"));
    component.onAddTask();
    //expect(component.openModal).toHaveBeenCalled();
    expect("SUCCESS").toBe(component.results);
    expect(service.AddTask).toHaveBeenCalled();    
  });

  it('Add should return Internal server error', () =>
  {
    component.taskDetail = new TaskDetail();   
    var error = { status: 500, _body :'"Internal server error"'};
    spyOn(service,'AddTask').and.returnValue(Observable.throw(error));
    component.onAddTask();     
    expect("Internal server error").toBe(component.results);
    expect(service.AddTask).toHaveBeenCalled();    
  });

  it('Resetting Task Detail', () =>
  {
    var taskDetail = new TaskDetail() ;   
    component.taskDetail = taskDetail;
    console.log(component.taskDetail.name);
    taskDetail.name ="task 1";
    taskDetail.id = 1;
    taskDetail.priority =10;
    
    component.onResetTask();           
    expect(0).toBe(component.taskDetail.priority);
    expect(component.taskDetail.id).toBeUndefined();
    expect(component.taskDetail.name).toBeUndefined();   
  })

  it('onclose modal should go to view', () =>
  {
    component.closeModal();     
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/view']);
  })
});
