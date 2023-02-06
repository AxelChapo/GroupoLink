import { Injectable } from "@angular/core";
import { Post } from "../models/post.model";

@Injectable({
  providedIn: 'root'
})

export class PostService {
  posts: Post[] = [
    {
      id: 1,
      userId: 'Personne 1',
      textContent: 'voici le post 1',
      imgUrl: '',
      createdDate: new Date(),
      likes: 0,
      liked: false
    },
    {
      id: 2,
      userId: 'Personne 2',
      textContent: 'voici le post 2',
      imgUrl: '',
      createdDate: new Date(),
      likes: 0,
      liked: false
    },
    {
      id: 3,
      userId: 'Personne 3',
      textContent: 'voici le post 3',
      imgUrl: '',
      createdDate: new Date(),
      likes: 0,
      liked: false
    },
  ];

  getAllPosts(): Post[] {
    return this.posts;
  }

  getPostById(postId: number): Post {
    const post: any = this.posts.find(post => post.id === postId);
    if (!post) {
      throw new Error('Post not found !');
    } else {
      return post;
    }
  }
}
