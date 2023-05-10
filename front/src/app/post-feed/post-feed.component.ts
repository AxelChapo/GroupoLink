import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Post } from "../core/models/post.model";
import { PostService } from "../core/services/post.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../core/services/auth.service";
import { HttpClient } from "@angular/common/http";
import {Router} from "@angular/router";

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
  imageSrc!: string;
  textValue!: string;

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
    this.refreshPost();
  }

  uploadImg() {
    // @ts-ignore
    this.imgInput.nativeElement.click();
  }

  postSubmit() {
    this.postService.postSubmit(this.postDeposit.value, this.image).then(post => {
      this.refreshPost();
    })
  }

  refreshPost() {
    this.postService.getAllPosts().then(posts => this.posts = posts);
    this.postDeposit.setValue({textContent: '', image: ''});
    this.imageSrc = ' ';
    this.fileName = '';
  }

  onFileSelected(event: Event) {
    const reader = new FileReader();
    // @ts-ignore
    if(event.target.files && event.target.files.length) {
      // @ts-ignore
      const [file] = event?.target?.files;
      this.image = file;
      this.fileName = file.name;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
  }
}
