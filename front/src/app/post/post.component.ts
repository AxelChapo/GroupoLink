import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import { Post } from "../models/post.model";
import { PostService } from "../services/post.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent implements OnInit {
  @Input() post!: Post;

  constructor(private postService: PostService,
              private router: Router) {}

  ngOnInit(): void {

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

  onViewPost() {
    this.router.navigateByUrl(`post/${this.post.id}`);
  }
}
