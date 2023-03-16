import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { PostService } from "../core/services/post.service";
import { Post } from "../core/models/post.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../core/services/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-modify-post',
  templateUrl: './modify-post.component.html',
  styleUrls: ['./modify-post.component.scss']
})
export class ModifyPostComponent implements OnInit {

  post!: Post;
  postModify: FormGroup;
  image!: File;
  fileName =  '';

  @ViewChild('imgInput') imgInput: ElementRef | undefined;

  constructor(private postService: PostService,
              private auth: AuthService,
              private route: ActivatedRoute) {
    this.postModify = new FormGroup ({
      textContent: new FormControl('', [Validators.required]),
      image: new FormControl('')
    },)
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
      this.postService.getOnePost(params['id']).then(post => {
        this.post = post;
        this.postModify.get('textContent')?.setValue(post.textContent);
      });
    });
  }

  uploadImg() {
    // @ts-ignore
    this.imgInput.nativeElement.click();
  }

  submitModifiedPost() {
    console.log(this.image);
    this.postService.submitModifiedPost({
      ...this.post,
      ...this.postModify.value
    });
  }

  onFileSelected(event: Event) {
    // @ts-ignore
    const file:File = event.target.files[0];
    if (file) {
      this.image = file;
    }
  }
}
