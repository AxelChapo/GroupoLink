import {Component, OnInit} from '@angular/core';
import { Post } from "../models/post.model";
import  { PostService } from "../services/post.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-post-commentary',
  templateUrl: './post-commentary.component.html',
  styleUrls: ['./post-commentary.component.scss']
})
export class PostCommentaryComponent implements OnInit {
  post!: Post;

  constructor(private postService: PostService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    const postId = +this.route.snapshot.params['id'];
    this.post = this.postService.getPostById(postId);
  }

  onLike() {
    if(this.post.liked == false) {
      this.post.likes++;
      this.post.liked = true;
    } else {
      this.post.likes--;
      this.post.liked = false;
    }
  }
}
