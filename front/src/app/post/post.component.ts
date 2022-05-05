import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import { Post } from "../models/post.model";
import { PostService } from "../services/post.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent implements OnInit {
  @Input() post!: Post;
  @ViewChild('commentary') commentary: ElementRef | undefined;

  constructor(private postService: PostService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const postId = +this.route.snapshot.params['id'];
  }

  onViewPost() {
    this.router.navigateByUrl(`post/${this.post.id}`)
  }
}
