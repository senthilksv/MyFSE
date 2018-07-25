import { Pipe, PipeTransform } from '@angular/core';
import { TaskDetail } from '../Models/taskDetail';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'taskmgrSearch',
  
})
export class TaskmgrSearchPipe  implements PipeTransform {
  datePipe : DatePipe;
constructor()
{
  this.datePipe = new DatePipe('en-US');
}
 
  transform(items: TaskDetail[], nameSearch: string, parentTaskSearch: string, 
    priorityFromSearch: number, priorityToSearch: number,
    startDateSearch :string, endDateSearch:string){
    if (items && items.length){
        return items.filter(item =>{ 
            if (nameSearch && item.name.toLowerCase().indexOf(nameSearch.toLowerCase()) === -1)
               return false;
            
            if (parentTaskSearch && item.parentName.toLowerCase()
            .indexOf(parentTaskSearch.toLowerCase()) === -1)
                return false;
            
            if (priorityFromSearch && item.priority < priorityFromSearch)            
              return false;
            
            if (priorityToSearch && item.priority > priorityToSearch)            
              return false;
            
            if (startDateSearch )
            {
             var startDateResult = this.datePipe.transform(item.startDate,'yyyy-MM-dd');
             var startDateResult1 = this.datePipe.transform(item.startDate,'dd-MM-yyyy');
             if(startDateResult != startDateSearch)            
              return false;            
            }
           if (endDateSearch)
            {
              var endDateResult = this.datePipe.transform(item.endDate,'yyyy-MM-dd');
              if(endDateResult != endDateSearch)            
               return false; 
            }
           
            return true;
       })
    }
    else{
        return items;
    }

  }
}
