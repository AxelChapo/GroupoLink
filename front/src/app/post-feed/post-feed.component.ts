import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Post } from "../models/post.model";
import  { PostService } from "../services/post.service";

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.scss']
})
export class PostFeedComponent implements OnInit {

  posts!: Post[];
  @ViewChild('imgInput') imgInput: ElementRef | undefined;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.posts = this.postService.getAllPosts();
  }
  uploadImg() {
    // @ts-ignore
    this.imgInput.nativeElement.click();
  }
}
