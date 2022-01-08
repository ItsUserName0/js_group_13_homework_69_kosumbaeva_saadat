import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @ViewChild('f') registrationForm!: NgForm;
  isEdit = false;
  editedId = '';
  isUploading = false;
  userUploadingSubscription!: Subscription;
  characters = '';

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.userUploadingSubscription = this.userService.userUploading.subscribe(isUploading => {
      this.isUploading = isUploading;
    })
    this.route.data.subscribe(data => {
      const user = <User>data.user;

      if (user) {
        this.isEdit = true;
        this.editedId = user.id;
        this.setFormValue({
          firstName: user.firstName,
          lastName: user.lastName,
          patronymic: user.patronymic,
          phoneNumber: user.phoneNumber,
          workStudyPlace: user.workStudyPlace,
          gender: user.gender,
          size: user.size,
          comment: user.comment
        })
      } else {
        this.isEdit = false;
        this.editedId = '';
        this.setFormValue({
          firstName: '',
          lastName: '',
          patronymic: '',
          phoneNumber: '',
          workStudyPlace: '',
          gender: '',
          size: '',
          comment: ''
        })
      }
    })
  }

  saveUser() {
    const id = this.editedId || Math.random().toString();

    const user = new User(id,
      this.registrationForm.value.firstName,
      this.registrationForm.value.lastName,
      this.registrationForm.value.patronymic,
      this.registrationForm.value.phoneNumber,
      this.registrationForm.value.workStudyPlace,
      this.registrationForm.value.gender,
      this.registrationForm.value.size,
      this.registrationForm.value.comment);

    const next = () => {
      this.userService.fetchUsers();
      if (!this.isEdit) {
        void this.router.navigate(['thanks']);
      }
    };

    if (this.isEdit) {
      this.userService.editUser(user).subscribe(next);
    } else {
      this.userService.addUser(user).subscribe(next);
    }
  }

  setFormValue(value: { [key: string]: any }) {
    setTimeout(() => {
      this.registrationForm.form.setValue(value);
    })
  }

  onCommentInput() {
    if (this.registrationForm.value.comment.length === 300) this.characters = '';
    else {
      this.characters = `Remaining characters: ${300 - this.registrationForm.value.comment.length}`;
    }
  }
}
