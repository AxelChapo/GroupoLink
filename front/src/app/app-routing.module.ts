import { NgModule } from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PostFeedComponent} from "./post-feed/post-feed.component";
import {LoginComponent} from "./auth/login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {ModifyPostComponent} from "./modify-post/modify-post.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'post-feed', component: PostFeedComponent, canActivate: [AuthGuard] },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  { path: 'post/:id', component: ModifyPostComponent, canActivate: [AuthGuard]},
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
