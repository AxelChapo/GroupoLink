import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { PostService } from "../core/services/post.service";
import { Post } from "../core/models/post.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../core/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-modify-post',
  templateUrl: './modify-post.component.html',
  styleUrls: ['./modify-post.component.scss']
})
export class ModifyPostComponent implements OnInit {

  post!: Post;
  postModify: FormGroup;
  image!: File;
  fileName!: string;
  imageSrc!: string;

  @ViewChild('imgInput') imgInput: ElementRef | undefined;

  constructor(private postService: PostService,
              private auth: AuthService,
              private route: ActivatedRoute,
              private router: Router) {
    this.postModify = new FormGroup ({
      textContent: new FormControl('', [Validators.required]),
      image: new FormControl('')
    },)
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postService.getOnePost(params['id']).then(post => {
        this.post = post;
        this.imageSrc = post.imageUrl;
        this.postModify.get('textContent')?.setValue(post.textContent);
        this.fileName = this.post.imageUrl?.split('images/')[1] ?? '';
      });
    });
  }

  uploadImg() {
    // @ts-ignore
    this.imgInput.nativeElement.click();
  }

  submitModifiedPost() {
    this.postService.submitModifiedPost({
      ...this.post,
      ...this.postModify.value,
    }).then(post => console.log(this.postModify.value)/**this.router.navigate(["/post-feed"])**/);
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
