import { Component, inject, Input, input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { type Task } from './task.model';
import { CardComponent } from '../../shared/card/card.component';
import { TasksService } from '../tasks.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  imports: [DatePipe, CardComponent],
})
export class TaskComponent {
  @Input() task!:Task;
  //task = input.required<Task>();
  private tasksService = inject(TasksService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);


  onComplete() {
    this.tasksService.removeTask(this.task.id);
    //when click complete task remove but ui noy uptade => resolver task not excute again so => (1)we must navigate to all tasks
    this.router.navigate(['./'],{
      // (2)to be ensure that you navigate to relative (currently activated route)=>parent component or back one step to all tasks
      relativeTo:this.activatedRoute,
      //(3)budefaul it will ignore navigation and to stop this ignore we set (reload)
      //(4) we should change =>runGuardsAndResolvers:'paramsOrQueryParamsChange' to runGuardsAndResolvers:'always',
      onSameUrlNavigation:'reload',
      //to make sure that query params are saved
      queryParamsHandling:'preserve'
    })
  }
}

