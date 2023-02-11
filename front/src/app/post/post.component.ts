import {Component, OnInit, Input} from '@angular/core';
import { Post } from "../core/models/post.model";
import { PostService } from "../core/services/post.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent implements OnInit {
  @Input() post!: Post;


  constructor(private postService: PostService,
              private router: Router) {
  }
  ngOnInit(): void {
  }

  postDelete() {
    this.postService.postDelete(this.post);
  }

  onLike() {
    this.postService.onLike();
  }
}

