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
  userData = {userId: "0", admin: false, };

  constructor(private postService: PostService,
              private router: Router,
              private http: HttpClient) {
  }
  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userLoginData') ?? '{}')
    if (this.userData.userId == this.post.user._id || this.userData.admin == true) {
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

  hasLiked() {
    return this.post.userLikes.includes(this.userData.userId);
  }
}

