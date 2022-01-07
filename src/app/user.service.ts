import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
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

}
