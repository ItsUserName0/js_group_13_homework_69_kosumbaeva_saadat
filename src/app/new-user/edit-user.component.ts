import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { phoneValidator } from '../shared/validate-phone.directive';

@Component({
  selector: 'app-new-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy {
  registrationForm!: FormGroup;
  isEdit = false;
  editedId = '';
  isUploading = false;
  userUploadingSubscription!: Subscription;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      patronymic: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [Validators.required, phoneValidator]),
      workStudyPlace: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      skills: new FormArray([], Validators.required),
      size: new FormControl('', Validators.required),
      comment: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    });
    this.userUploadingSubscription = this.userService.userUploading.subscribe(isUploading => {
      this.isUploading = isUploading;
    })
    this.route.data.subscribe(data => {
      const user = <User>data.user;

      if (user) {
        this.isEdit = true;
        this.editedId = user.id;
        this.registrationForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          patronymic: user.patronymic,
          phoneNumber: user.phoneNumber,
          workStudyPlace: user.workStudyPlace,
          gender: user.gender,
          size: user.size,
          comment: user.comment
        });
      } else {
        this.isEdit = false;
        this.editedId = '';
        this.registrationForm.patchValue({
          firstName: '',
          lastName: '',
          patronymic: '',
          phoneNumber: '',
          workStudyPlace: '',
          gender: '',
          size: '',
          comment: ''
        });
      }
    });
  }

  setStyle() {
    const skills = <FormArray>this.registrationForm.controls['skills'];
    return skills.length;
  }

  fieldHasError(fieldName: string, errorType: string) {
    const field = this.registrationForm.get(fieldName);
    return field && field.touched && field.errors?.[errorType];
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
      this.registrationForm.value.skills,
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

  onCommentInput() {
    if (this.registrationForm.value.comment.length === 300) {
      return '';
    } else {
      return `Remaining characters: ${300 - this.registrationForm.value.comment.length}`;
    }
  }

  addSkill() {
    const skills = <FormArray>this.registrationForm.get('skills');
    const skillGroup = new FormGroup({
      skillName: new FormControl('', Validators.required),
      skillLevel: new FormControl('', Validators.required),
    });
    skills.push(skillGroup);
  }

  getSkillControls() {
    const skills = <FormArray>this.registrationForm.get('skills');
    return skills.controls;
  }

  ngOnDestroy(): void {
    this.userUploadingSubscription.unsubscribe();
  }
}
