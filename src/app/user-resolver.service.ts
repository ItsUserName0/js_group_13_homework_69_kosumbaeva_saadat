import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { UserService } from './user.service';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<User> {

  constructor(private router: Router,
              private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> | User {
    const userId = <string>route.params['id'];
    return this.userService.fetchUser(userId).pipe(mergeMap(user => {
      if (user) return of(user);
      void this.router.navigate(['/']);
      return EMPTY;
    }))
  }

}
