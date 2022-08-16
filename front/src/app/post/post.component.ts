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

  postEdit() {
    console.log('test');
    let post = {
      id: this.post.id,
      userId: this.post.userId,
      txtContent: this.post.textContent,
      imgUrl: this.post.imgUrl,
      createdDate: this.post.createdDate,
      liked: this.post.liked,
      likes: this.post.likes,
    }
    fetch('http://loccalhost:3000/API/post', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    }).then(response => response.json())
  }

  postDelete() {
    console.log('test');
    let post = {
      id: this.post.id,
      userId: this.post.userId,
      txtContent: this.post.textContent,
      imgUrl: this.post.imgUrl,
      createdDate: this.post.createdDate,
      liked: this.post.liked,
      likes: this.post.likes,
    }
    fetch('http://localhost:3000/API/post', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    }).then(response => response.json)
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

