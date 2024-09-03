import { ActivatedRoute, RouterLink, ActivatedRouteSnapshot, RouterStateSnapshot, ResolveFn } from '@angular/router';
import { Component, computed, input, OnInit, DestroyRef, signal, inject } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent,RouterLink],
})
export class TasksComponent {
  //it will not work with nested routing
  //   but it work with adding this method to route in appconfig
  //withRouterConfig({
  //     paramsInheritanceStrategy:'always'
  // })
  userId = input.required<string>();
  userTasks = input.required<Task[]>();
  //order = input<'asc' | 'desc'>()
  // order!:'asc'|'desc';
  order = input<'asc'|'desc' | undefined>();
  // constructor(
  //   private _ActivatedRoute:ActivatedRoute,
  //   private _TasksService:TasksService,
  //   private destroyRef:DestroyRef
  // ){}

  // ngOnInit(): void {
  //   const subscription = this._ActivatedRoute.queryParams.subscribe({
  //     next:params =>this.order.set(params['order'])//url => emit on queries on url => with every change

  //   })
  //   this.destroyRef.onDestroy(()=>{
  //     subscription.unsubscribe();
  //   })
  // }


  // userTasks = computed(()=> this._TasksService.allTasks()
  // .filter((task)=> task.userId === this.userId())
  // .sort((a,b)=>{
  //       if(this.order()=== 'desc'){
  //         return a.id >b.id?-1:1
  //       }else{
  //         return a.id >b.id?1:-1
  //       }
  //     }
  //   )
  // )


 
}

export const resolveUserTasks:ResolveFn<Task[]> = (
  activatedRouteSnapshot:ActivatedRouteSnapshot,
  routerStateSnapshot:RouterStateSnapshot
)=>{
  const order = activatedRouteSnapshot.queryParams['order'];
  const tasksService = inject(TasksService);
  const tasks = tasksService.allTasks().filter((task)=>
    task.userId === activatedRouteSnapshot.paramMap.get('userId')
  )
  if (order && order === 'asc') {
    tasks.sort((a, b) => (a.id > b.id ? 1 : -1));
  } else {
    tasks.sort((a, b) => (a.id > b.id ? -1 : 1));
  }


  return tasks.length ? tasks : [];
}