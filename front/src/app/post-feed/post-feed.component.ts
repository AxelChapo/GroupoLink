import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Post } from "../core/models/post.model";
import { PostService } from "../core/services/post.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../core/services/auth.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.scss']
})

export class PostFeedComponent implements OnInit {

  postDeposit: FormGroup;
  posts!: Post[];
  fileName =  '';
  image!: File;

  @ViewChild('imgInput') imgInput: ElementRef | undefined;

  constructor(private postService: PostService,
              private auth: AuthService,
              private http: HttpClient) {
    //récupération/vérification des données du post
    this.postDeposit = new FormGroup ({
      textContent: new FormControl('', [Validators.required]),
      image: new FormControl('')
    },)
  }

  ngOnInit(): void {
    //récupération des post grâce à postService
    this.postService.getAllPosts().then(posts => this.posts = posts);
  }

  uploadImg() {
    // @ts-ignore
    this.imgInput.nativeElement.click();
  }

  postSubmit() {
    console.log(this.image);
    this.postService.postSubmit(this.postDeposit.value, this.image).then(post => {
      this.postService.getAllPosts().then(posts => this.posts = posts);
    });
  }

  refreshPost() {
    this.postService.getAllPosts().then(posts => this.posts = posts);
  }

  onFileSelected(event: Event) {
    // @ts-ignore
    const file:File = event.target.files[0];
    if (file) {
      this.image = file;
      this.fileName = file.name;
    }
  }
}
