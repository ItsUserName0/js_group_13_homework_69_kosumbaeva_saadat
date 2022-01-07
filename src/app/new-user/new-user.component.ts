import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  @ViewChild('f') registrationForm!: NgForm;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.registrationForm);
    // this.registrationForm.reset();
  }

}
