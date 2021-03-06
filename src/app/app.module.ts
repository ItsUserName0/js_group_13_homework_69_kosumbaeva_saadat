import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EditUserComponent } from './new-user/edit-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidatePhoneDirective } from './shared/validate-phone.directive';
import { HttpClientModule } from '@angular/common/http';
import { ThanksComponent } from './thanks.component';
import { AppRoutingModule } from './app-routing.module';
import { ApplicationsComponent } from './applications/applications.component';
import { ApplicationComponent } from './applications/application/application.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { EmptyComponent } from './empty.component';

@NgModule({
  declarations: [
    AppComponent,
    EditUserComponent,
    ValidatePhoneDirective,
    ThanksComponent,
    ApplicationsComponent,
    ApplicationComponent,
    ToolbarComponent,
    EmptyComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
