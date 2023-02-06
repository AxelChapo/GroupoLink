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
    fetch('http://localhost:3000/API/post/', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userLoginData') ?? '{}').token
      },
      // @ts-ignore
      body: form//envoie du contenu du post à L'API
    }).then(response => response.json()).then(response => {
      //rechargement du component
      //location.reload();
    });
  }

  submitModifiedPost(post: Post) {
    //appel de l'API/post
    console.log(post);
    fetch('http://loccalhost:3000/API/' + post._id, {
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
    console.log(post);
    fetch('http://localhost:3000/API/post/' + post._id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userLoginData') ?? '{}').token
      },
    })
  }

  onLike() {
    //récupération des données du post
    let post = this.post;
    //appel de l'API/post
    fetch('http://loccalhost:3000/API/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userLoginData') ?? '{}').token
      },
      body: JSON.stringify(post) //envoi du post en JSON
    }).then(response => response.json())
  }

  getOnePost() {
    let post
  }
}
