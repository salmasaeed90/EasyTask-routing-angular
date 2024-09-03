import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { CanDeactivateFn, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userId = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  submitted:boolean = false;
  private tasksService = inject(TasksService);
  private router = inject(Router)

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId()
    );

    this.submitted = true;
    this.router.navigate(['/users',this.userId(),'tasks'],{
      //to make sure that this navigation action essentially works like redirect
      // and ensures that the user can`t use the back button to go back to this page where thiy are comming from
      //some time you want to diable that especially after aform has been submitted so
      //if user click back button it will navigate to home or starter component not to this navigate
      replaceUrl:true
    })
  }
  
}
export const canLeaveEditPage:CanDeactivateFn<NewTaskComponent> = (component,) => {
  if(component.submitted){
    return true;
  }
  if(component.enteredTitle() || component.enteredDate() || component.enteredSummary()){
    return window.confirm('Do you really want to leave, you will loose your entered Data?');
  }
  return true;
}