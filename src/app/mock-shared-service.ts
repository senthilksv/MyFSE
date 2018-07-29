import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { TaskDetail } from './Models/taskDetail';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
const TASK_DETAILS : any[] = [
    { "id": 101, "name": "Task 101", "startDate": "2018-07-23","endDate" :"2018-07-28", "priority":10,"endTask":false, "parentId":2, "parentName":"parent" },
    ];

  const TASK_DETAIL : TaskDetail = new TaskDetail();
export class MockSharedService {
    
    public GetAllTasks(): Observable<TaskDetail[]> {
        return Observable.of(TASK_DETAILS);
      }

      public GetTask(): Observable<TaskDetail> {
        return Observable.of(TASK_DETAIL);
      }

      public AddTask(Item:TaskDetail): Observable<string> {
        return Observable.of("Success");
      }

      PutTask(Item:TaskDetail, Id:number): Observable<string> {
        return Observable.of("Success");
      }
}
