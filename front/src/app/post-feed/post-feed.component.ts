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
  @ViewChild('txtInput') txtInput: ElementRef | undefined;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.posts = this.postService.getAllPosts();
  }
  uploadImg() {
    // @ts-ignore
    this.imgInput.nativeElement.click();
  }

  postSubmit() {
    let postData = {
      txtContent: this.txtInput,
      imgContent: this.imgInput,
    }
    fetch('http://localhost:3000/API/post', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    }).then(response => response.json()).then(response => {
      // @ts-ignore
      localStorage.setItem('postData', postData);
      location.replace('/post-feed');
    });
  }
  //TODO:
  // postModify() {
  //     let postData = {
  //       txtContent: this.txtInput,
  //       imgContent: this.imgInput,
  //     }
  //     fetch('http://localhost:3000/API/post', {
  //       method: "PUT",
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(postData)
  //     }).then(response => response.json()).then(response => {
  //       // @ts-ignore
  //       localStorage.setItem('postData', postData);
  //       location.replace('/post-feed');
  //     });
  //   }

  //TODO:
  // postDelete() {
  //     let postData = {
  //       txtContent: this.txtInput,
  //       imgContent: this.imgInput,
  //     }
  //     fetch('http://localhost:3000/API/post', {
  //       method: "DELETE",
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(postData)
  //     }).then(response => response.json()).then(response => {
  //       // @ts-ignore
  //       localStorage.setItem('postData', postData);
  //       location.replace('/post-feed');
  //     });
  //   }

}

