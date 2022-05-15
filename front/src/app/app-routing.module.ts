import { NgModule } from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PostFeedComponent} from "./post-feed/post-feed.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {Post} from "./models/post.model";
import {PostComponent} from "./post/post.component";
import {PostCommentaryComponent} from "./post-commentary/post-commentary.component";

const routes: Routes = [
  { path: 'post-feed', component: PostFeedComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'post/:id', component: PostCommentaryComponent}
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
