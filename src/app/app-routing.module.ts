import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThanksComponent } from './thanks.component';
import { EditUserComponent } from './new-user/edit-user.component';
import { ApplicationsComponent } from './applications/applications.component';
import { ApplicationComponent } from './applications/application/application.component';
import { UserResolverService } from './shared/user-resolver.service';
import { EmptyComponent } from './empty.component';

const routes: Routes = [
  {
    path: '', component: ApplicationsComponent, children: [
      {path: '', component: EmptyComponent},
      {
        path: 'users/:id', component: ApplicationComponent, resolve: {
          user: UserResolverService
        }
      },
    ]
  },
  {
    path: 'users/:id/edit', component: EditUserComponent, resolve: {
      user: UserResolverService
    }
  },
  {path: 'new-user', component: EditUserComponent},
  {path: 'thanks', component: ThanksComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
