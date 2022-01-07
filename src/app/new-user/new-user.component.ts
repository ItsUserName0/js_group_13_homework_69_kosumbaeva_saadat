import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {
  @ViewChild('f') registrationForm!: NgForm;

  constructor(private userService: UserService, private router: Router) {
  }

  onSubmit() {
    const user = new User(this.registrationForm.value.firstName,
      this.registrationForm.value.lastName,
      this.registrationForm.value.patronymic,
      this.registrationForm.value.phoneNumber,
      this.registrationForm.value.workStudyPlace,
      this.registrationForm.value.gender,
      this.registrationForm.value.size,
      this.registrationForm.value.comment);

    this.userService.addUser(user).subscribe(() => {
      void this.router.navigate(['thanks']);
    });
  }

}
