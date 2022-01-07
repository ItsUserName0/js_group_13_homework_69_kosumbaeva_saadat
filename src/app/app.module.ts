import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NewUserComponent } from './new-user/new-user.component';
import { FormsModule } from '@angular/forms';
import { ValidatePhoneDirective } from './validate-phone.directive';
import { ValidateCommentDirective } from './validate-comment.directive';
import { HttpClientModule } from '@angular/common/http';
import { ThanksComponent } from './thanks.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NewUserComponent,
    ValidatePhoneDirective,
    ValidateCommentDirective,
    ThanksComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
