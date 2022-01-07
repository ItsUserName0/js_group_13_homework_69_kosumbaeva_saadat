import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NewUserComponent } from './new-user/new-user.component';
import { FormsModule } from '@angular/forms';
import { ValidatePhoneDirective } from './validate-phone.directive';
import { ValidateCommentDirective } from './validate-comment.directive';

@NgModule({
  declarations: [
    AppComponent,
    NewUserComponent,
    ValidatePhoneDirective,
    ValidateCommentDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
