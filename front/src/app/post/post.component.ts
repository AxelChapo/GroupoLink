import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Post } from "../core/models/post.model";
import { PostService } from "../core/services/post.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent implements OnInit {

  @Output() onUpdate = new EventEmitter();
  @Input() post!: Post;
  posts!: Post[];
  isAdminOrCreator =  false;
  hasLiked = false;

  constructor(private postService: PostService,
              private router: Router,
              private http: HttpClient) {
  }
  ngOnInit(): void {
    const userData = localStorage.getItem('userLoginData') ?? '{}'
    if (JSON.parse(userData).userId == this.post.user._id || JSON.parse(userData).admin == true) {
      this.isAdminOrCreator = true;
    }
  }

  postDelete() {
    this.postService.postDelete(this.post).then(post => {
      this.onUpdate.emit()
    });
  }

  onLike() {
    this.postService.onLike(this.post._id).then(post => {
      this.onUpdate.emit()
    });
  }
}

