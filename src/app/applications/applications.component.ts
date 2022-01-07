import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit, OnDestroy {
  users: User[] = [];
  usersFetchingSubscription!: Subscription;
  usersChangeSubscription!: Subscription;
  isFetching = false;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.usersFetchingSubscription = this.userService.usersFetching.subscribe(isFetching => {
      this.isFetching = isFetching;
    });
    this.usersChangeSubscription = this.userService.usersChange.subscribe(users => {
      this.users = users;
    });
    this.userService.fetchUsers();
  }

  ngOnDestroy(): void {
    this.usersFetchingSubscription.unsubscribe();
    this.usersChangeSubscription.unsubscribe();
  }

}
