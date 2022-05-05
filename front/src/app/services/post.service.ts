import { Injectable } from "@angular/core";
import { Post } from "../models/post.model";

@Injectable({
  providedIn: 'root'
})

export class PostService {
  posts: Post[] = [
    {
      id: 1,
      textContent: 'voici le post 1',
      creatorName: 'Personne 1',
      createdDate: new Date(),
      likes: 11,
    },
    {
      id: 2,
      textContent: 'voici le post 2',
      creatorName: 'Personne 2',
      createdDate: new Date(),
      likes: 22,
    },
    {
      id: 3,
      textContent: 'voici le post 3',
      creatorName: 'Personne 3',
      createdDate: new Date(),
      likes: 33,
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
