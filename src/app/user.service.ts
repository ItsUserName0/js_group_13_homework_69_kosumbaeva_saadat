import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { map, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [];
  usersChange = new Subject<User[]>();
  usersFetching = new Subject<boolean>();
  userRemoving = new Subject<boolean>();
  userUploading = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  fetchUsers() {
    this.usersFetching.next(true);
    return this.http.get<{ [id: string]: User }>('https://skosumbaeva2502-default-rtdb.firebaseio.com/users.json')
      .pipe(map(result => {
        return Object.keys(result).map(id => {
          const data = result[id];
          return new User(id, data.firstName, data.lastName, data.patronymic, data.phoneNumber, data.workStudyPlace, data.gender, data.size, data.comment);
        })
      }))
      .subscribe(result => {
        this.users = result;
        this.usersChange.next(this.users.slice());
        this.usersFetching.next(false);
      }, () => {
        this.usersFetching.next(false);
      });
  }

  fetchUser(id: string) {
    return this.http.get<User | null>(`https://skosumbaeva2502-default-rtdb.firebaseio.com/users/${id}.json`).pipe(
      map(result => {
        if (!result) return null;
        return new User(id, result.firstName, result.lastName, result.patronymic, result.phoneNumber, result.workStudyPlace, result.gender, result.size, result.comment);
      })
    );
  }

  addUser(user: User) {
    const body = {
      firstName: user.firstName,
      lastName: user.lastName,
      patronymic: user.patronymic,
      phoneNumber: user.phoneNumber,
      workStudyPlace: user.workStudyPlace,
      gender: user.gender,
      size: user.size,
      comment: user.comment
    };
    return this.http.post('https://skosumbaeva2502-default-rtdb.firebaseio.com/users.json', body);
  }

  editUser(user: User) {
    this.userUploading.next(true);

    const body = {
      firstName: user.firstName,
      lastName: user.lastName,
      patronymic: user.patronymic,
      phoneNumber: user.phoneNumber,
      workStudyPlace: user.workStudyPlace,
      gender: user.gender,
      size: user.size,
      comment: user.comment
    }

    return this.http.put(`https://skosumbaeva2502-default-rtdb.firebaseio.com/users/${user.id}.json`, body).pipe(
      tap(() => {
        this.userUploading.next(false);
      }, () => {
        this.userUploading.next(false);
      })
    )
  }

  removeUser(id: string) {
    this.userRemoving.next(true);
    return this.http.delete(`https://skosumbaeva2502-default-rtdb.firebaseio.com/users/${id}.json`).pipe(
      tap(() => {
        this.userRemoving.next(false);
      }, () => {
        this.userRemoving.next(false);
      })
    )
  }

}
