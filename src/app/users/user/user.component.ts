import { Component, computed, Input, input } from '@angular/core';

import {  User } from './user.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  imports:[RouterLink]
})
export class UserComponent {
  @Input({required:true}) user!:User ;

  imagePath = computed(() => 'users/' + this.user.avatar);
}
