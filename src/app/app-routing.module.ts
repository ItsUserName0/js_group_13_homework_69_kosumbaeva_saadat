import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThanksComponent } from './thanks.component';
import { NewUserComponent } from './new-user/new-user.component';

const routes: Routes =[
  {path: '', component: NewUserComponent},
  {path: 'thanks', component: ThanksComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
