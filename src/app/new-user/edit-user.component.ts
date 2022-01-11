import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  user!: User;
  registrationForm!: FormGroup;
  userUploadingSubscription!: Subscription;
  isEdit = false;
  isUploading = false;
  editedId = '';

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {
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
    });
    this.route.data.subscribe(data => {
      this.user = <User>data.user;

      if (this.user) {
        this.isEdit = true;
        this.editedId = this.user.id;
        this.seedForm();
        this.registrationForm.patchValue({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          patronymic: this.user.patronymic,
          phoneNumber: this.user.phoneNumber,
          workStudyPlace: this.user.workStudyPlace,
          gender: this.user.gender,
          size: this.user.size,
          comment: this.user.comment
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

  getSkillsGroup(name: string, level: string): FormGroup {
    return this.formBuilder.group({
      skillName: [name, Validators.required],
      skillLevel: [level, Validators.required]
    });
  }

  seedForm() {
    const skills = <FormArray>this.registrationForm.get('skills');
    for (let i = 0; i < this.user.skills.length; i++) {
      const skill = this.getSkillsGroup(this.user.skills[i].skillName, this.user.skills[i].skillLevel);
      skills.push(skill);
    }
  }

  setStyle() {
    const skills = <FormArray>this.registrationForm.get('skills');
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

  removeSkill(index: number) {
    if (this.isEdit) {
      this.userService.removeSkill(this.editedId, index.toString()).subscribe();
    }
    const skills = <FormArray>this.registrationForm.get('skills');
    skills.removeAt(index);
  }

  ngOnDestroy(): void {
    this.userUploadingSubscription.unsubscribe();
  }
}
