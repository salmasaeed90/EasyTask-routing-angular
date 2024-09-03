import { UsersService } from './../users.service';
import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports:[RouterOutlet, RouterLink]
})
export class UserTasksComponent {
  //binding from routing
  //userId = input.required<string>();
  userName = input<string>();
  message = input<string>();
  // private usersService = inject(UsersService);
  //private activatedRoute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef)

  // ngOnInit(){
  // using userName fron routing (url) can replacing this code
  //   this.activatedRoute.data.subscribe({
  //     next:data => console.log(data),
      
  //   })
  // }


  //with observable
  // ngOnInit():void{
  //   console.log('Input Data :' + this.message());
    
  //   console.log(this.activatedRoute);
  //   const subscription = this.activatedRoute.paramMap.subscribe({
  //     next: (paramMap)=>{
  //       this.userName = this.usersService.users.find((u)=> u.id === paramMap.get('userId'))?.name || '';
  //     }
  //   })
  //   this.destroyRef.onDestroy(()=>{
  //     subscription.unsubscribe();
  //   })

  // }
  //with signal
  // userName = computed(()=> this.usersService.users.find((u)=> u.id === this.userId())?.name)

}
//we need to send user name with routing => use resolve in routing file 
//=> implement this func to emit on url and send user name with every change
//we dont need to get user name by emit on userId from routing so i comment ngOnInit func and resolve func will implement same logic
//we can do all this but in service but it is deprecate(classعادى جداا)
export const resolveUserName:ResolveFn<string> = (//func will return strinf(userName)
  activatedRoute:ActivatedRouteSnapshot,
  routerState:RouterStateSnapshot
)=>{
  const usersService = inject(UsersService);
  const userName = usersService.users.find((u)=> u.id === activatedRoute.paramMap.get('userId'))?.name || '';
  return userName;

}

export const resolveTitle:ResolveFn<string> = (//func will return strinf(userName)
  activatedRoute:ActivatedRouteSnapshot,
  routerState:RouterStateSnapshot
) => {
  return resolveUserName(activatedRoute,routerState) +'`s Tasks';
  
}
