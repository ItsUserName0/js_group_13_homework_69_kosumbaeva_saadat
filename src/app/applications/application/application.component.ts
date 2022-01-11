import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../shared/user.model';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit, OnDestroy {
  user!: User;
  userRemovingSubscription!: Subscription;
  isRemoving = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.user = <User>data.user;
    });
    this.userRemovingSubscription = this.userService.userRemoving.subscribe(isRemoving => {
      this.isRemoving = isRemoving;
    })
  }

  onRemove() {
    this.userService.removeUser(this.user.id).subscribe(() => {
      this.userService.fetchUsers();
      void this.router.navigate(['']);
    })
  }

  skillNameHandler(skillName: string) {
    return skillName.split('-').join(' ');
  }

  ngOnDestroy(): void {
    this.userRemovingSubscription.unsubscribe();
  }

}
