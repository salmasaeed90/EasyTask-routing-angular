import { Routes } from "@angular/router";
import { canLeaveEditPage, NewTaskComponent } from "../tasks/new-task/new-task.component";

import { resolveUserTasks, TasksComponent } from "../tasks/tasks.component";




  
  
export const usersRoutes:Routes=[
    {path:'',redirectTo:'tasks', pathMatch:'full'},
    {path:'tasks', 
        component:TasksComponent,
        // loadComponent:() => import("../tasks/tasks.component").then((m)=>m.TasksComponent),
        //dynamic data // work when route params changes => not with queruparams changes => sorting with query dosnt work
        runGuardsAndResolvers:'always',
        resolve:{userTasks:resolveUserTasks}},
    {path:'tasks/new',
        //if we change to lazy loading it didnt work becouse of this gard => depend on his class
        //we will achive lazy loading in main routes => loadchildren
        component:NewTaskComponent,
        canDeactivate:[canLeaveEditPage]
        },
]

