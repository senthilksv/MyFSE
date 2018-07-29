import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TaskDetail } from '../Models/taskDetail';
import { SharedService } from '../shared.service';
import { Router} from '@angular/router';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'app-taskmgr-add',
  templateUrl: './taskmgr-add.component.html',
  styleUrls: ['./taskmgr-add.component.css']
})
export class TaskmgrAddComponent implements OnInit {

  @ViewChild('showmodalClick') showmodalClick:ElementRef;
  taskDetails:TaskDetail[]
  public taskDetail:TaskDetail;
  results:string
  constructor(private service:SharedService,private router: Router) { 
   this.taskDetail = new TaskDetail();
   this.taskDetail.priority = 0;
  }

  
  ngOnInit() {
 
    this.service.GetAllTasks().subscribe(
      p=>this.taskDetails=p.filter(res => !res.endTask));
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
          this.openModal();
        },
        error =>
        {
          console.log(error.status);
          console.log(error.statusText);
          console.log(error._body);
          console.log(JSON.parse(error._body));
          if(error.status < 200 || error.status > 300)
            this.results = JSON.parse(error._body);
            this.openModal();
        }
      );
    }

    onResetTask()
    {
      this.taskDetail = new TaskDetail();
      this.taskDetail.priority = 0;
    }

    openModal() {
      this.showmodalClick.nativeElement.click();
    }
    closeModal() {
      this.router.navigate(['/view']);
    }

}
