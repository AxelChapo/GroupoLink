import { NgModule } from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PostFeedComponent} from "./post-feed/post-feed.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";

const routes: Routes = [
  { path: 'post-feed', component: PostFeedComponent },
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'user-profile', component: UserProfileComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
