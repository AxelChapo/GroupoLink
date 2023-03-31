import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Post } from "../core/models/post.model";
import { PostService } from "../core/services/post.service";
import { Router } from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent implements OnInit {

  @Output() onDelete = new EventEmitter();
  @Input() post!: Post;
  posts!: Post[];

  constructor(private postService: PostService,
              private router: Router,
              private http: HttpClient) {
  }
  ngOnInit(): void {
  }

  postDelete() {
    this.postService.postDelete(this.post).then(post => {
      this.onDelete.emit()
    });
  }

  onLike() {
    this.postService.onLike();
  }

  //TODO: fct récup local storage pour admin/userID
}

