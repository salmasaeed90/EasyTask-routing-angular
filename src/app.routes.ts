import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { NoTaskComponent } from './app/tasks/no-task/no-task.component';
import { TasksComponent } from './app/tasks/tasks.component';
import { resolveTitle, resolveUserName, UserTasksComponent } from './app/users/user-tasks/user-tasks.component';
import { NewTaskComponent } from './app/tasks/new-task/new-task.component';
import { NotFoundComponent } from './app/not-found/not-found.component';
import { usersRoutes } from './app/users/users.routes';
import { inject } from '@angular/core';
import { TasksService } from './app/tasks/tasks.service';

export const dummyCanMatch:CanMatchFn = (route,segmants)=>{
    const router = inject(Router);
    const shouldGetAccess = Math.random();
    if(shouldGetAccess < 0.5){
        return true;
    }
    //navigate to diffrernt page
    return new RedirectCommand(router.parseUrl('/unauthorized'));
}


export const routes: Routes = [
    //the way to make service load lazely
    {   path: '',providers:[TasksService],
        children:[
            {path:'', component:NoTaskComponent,
                //static title for page
                title:'NoTaskSelected'},
        
            {path:'users/:userId', component:UserTasksComponent,
                loadChildren: () => import('./app/users/users.routes').then((mod)=>mod.usersRoutes),
                // canMatch: [dummyCanMatch],
                //static data
                data:{message:'hello'},
                //dynamic data 
                
                resolve:{userName:resolveUserName},
                title:resolveTitle
            },  
            {path:'**',component:NotFoundComponent}
        ]

    }
    

];