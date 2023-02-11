import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { PostService } from "../core/services/post.service";
import { Post } from "../core/models/post.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../core/services/auth.service";

@Component({
  selector: 'app-modify-post',
  templateUrl: './modify-post.component.html',
  styleUrls: ['./modify-post.component.scss']
})
export class ModifyPostComponent implements OnInit {

  post!: Post;
  postModify: FormGroup;

  @ViewChild('imgInput') imgInput: ElementRef | undefined;

  constructor(private postService: PostService,
              private auth: AuthService) {
    this.postModify = new FormGroup ({
      textContent: new FormControl('', [Validators.required]),
      imageUrl: new FormControl('')
    },)
  }

  ngOnInit(): void {
    this.postService.getOnePost();
  }

  submitModifiedPost() {
    this.postService.submitModifiedPost(this.postModify.value);
  }

  uploadImg() {
    // @ts-ignore
    this.imgInput.nativeElement.click();
  }
}
