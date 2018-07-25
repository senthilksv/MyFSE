import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TaskDetail } from '../Models/taskDetail';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-taskmgr-view',
  templateUrl: './taskmgr-view.component.html',
  styleUrls: ['./taskmgr-view.component.css']
 
})
export class TaskmgrViewComponent implements OnInit {

  @ViewChild('showmodalClick') showmodalClick:ElementRef;
   taskDetails:TaskDetail[] = [];
   taskDetailsFiltered:TaskDetail[] = [];
  task :string;
  parentTask:string;
  priorityFrom:number ;
  priorityTo:number;
  startDate:string;
  endDate:string;
  taskDetail:TaskDetail;
  results:string;
  
  constructor(private service:SharedService,
    private router: Router, private location:Location) { }

  ngOnInit() {

    this.service.GetAllTasks().subscribe(
    response =>
      {        
        (response as TaskDetail[]).forEach(element =>
           {
             let taskDetail = (response as TaskDetail[]).find(res=> res.id == element.parentId);
             if(taskDetail != undefined)
                element.parentName = taskDetail.name;
             else       
                element.parentName = "This Task has No Parent";
        }); 

        this.taskDetails = response;
        this.taskDetailsFiltered = response;
    });    
  }

  edit(taskId) {
    this.router.navigate(['/edit'], { queryParams: { id: taskId.value} });
  }

  endTask(taskId) {
    this.taskDetail =  this.taskDetails.
    find(taskElement => taskElement.id == taskId.value);
    this.taskDetail.endTask = true;

    this.service.PutTask(this.taskDetail, this.taskDetail.id).subscribe(response => 
      {
        if(response.length > 0)
          this.results = this.taskDetail.name + " has been closed successfully";
        console.log("result text:" + this.results);
        this.openModal();
      },
      error =>
      {
        if(error.status < 200 || error.status > 300)
        {
          this.taskDetail.endTask = false;
          this.results = error.statusText + "-" + error._body;
          this.openModal();
        }
          console.log("error " + error._body);
      }
    );
  }

  openModal() {
    this.showmodalClick.nativeElement.click();
  }

  closeModal() {
   // location.reload();
  }

}
