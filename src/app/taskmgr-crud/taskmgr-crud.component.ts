import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TaskDetail } from '../Models/taskDetail';
import { SharedService } from '../shared.service';

import 'rxjs/add/operator/catch';


@Component({
  selector: 'app-taskmgr-crud',
  templateUrl: './taskmgr-crud.component.html',
  styleUrls: ['./taskmgr-crud.component.css'  
  ]
})
export class TaskMgrCrudComponent implements OnInit
{
  @ViewChild('showmodalClick') showmodalClick:ElementRef;
  taskDetails:TaskDetail[]
  public taskDetail:TaskDetail;
  results:string
  constructor(private service:SharedService) { 
   this.taskDetail = new TaskDetail();
   this.taskDetail.priority = 0;
  }

  
  ngOnInit() {
  
    this.service.GetAllTasks().subscribe(
      p=>this.taskDetails=p);
    }

    onAddTask()
    {
      console.log('name:' + this.taskDetail.name);
      console.log('priority:' + this.taskDetail.priority);      
      console.log('startdate:' + this.taskDetail.startDate);
      console.log('enddate:' + this.taskDetail.endDate);
      this.service.AddTask(this.taskDetail).subscribe(response => 
        {
          this.results = response;
          console.log("result text:" + this.results);
          this.openModel();
        },
        error =>
        {
          console.log("error " + error._body);
        }
      );
    }

    onResetTask()
    {
      this.taskDetail = new TaskDetail();
      this.taskDetail.priority = 0;
    }

    openModel() {
      this.showmodalClick.nativeElement.click();
    }
    closeModel() {
       //this.myModal.nativeElement.className = 'modal hide';
    }
}


