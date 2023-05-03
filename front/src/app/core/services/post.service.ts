import { Injectable, Input } from "@angular/core";
import { Post } from "../models/post.model";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class PostService {

  @Input() post!: Post;
  posts!: Post[];

  constructor(private router: Router,
              private auth: AuthService) {
  }

  async getAllPosts(): Promise<Post[]> {
    return await fetch('http://localhost:3000/API/post/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userLoginData') ?? '{}').token
      }
    })
      .then(posts => posts.json());

  }

  postSubmit(post: Post, image: any) {
    //vérification de l'authentification
    this.auth.login();
    const form = new FormData();
    form.append('post', JSON.stringify(post));
    form.append('image', image);
    //appel de l'API/createPost
    return fetch('http://localhost:3000/API/post/', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userLoginData') ?? '{}').token
      },
      // @ts-ignore
      body: form
    }).then(response => response.json())
  }

  submitModifiedPost(post: Post) {
    //appel de l'API/post
    return fetch('http://localhost:3000/API/post/' + post._id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userLoginData') ?? '{}').token
      },
      body: JSON.stringify(post), //envoi du post en JSON
    }).then(response => response)
  }

  postDelete(post: Post) {
    //appel de l'API/post
    return fetch('http://localhost:3000/API/post/' + post._id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userLoginData') ?? '{}').token
      },
    }).then(response => response.json())
  }

  getOnePost(id: number) {
    return fetch('http://localhost:3000/API/post/' + id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userLoginData') ?? '{}').token
      },
    }).then(response => response.json());
  }

  onLike(id: number) {
    //appel de l'API/post
    return fetch('http://localhost:3000/API/post/like/' + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userLoginData') ?? '{}').token
      },
    }).then(response => response.json())
  }
}
