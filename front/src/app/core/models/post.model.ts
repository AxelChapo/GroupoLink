import {User} from "./user.model";

export class Post {
  _id!: number;
  textContent!: string;
  imageUrl?: string;
  user!: User;
  createdDate!: Date;
  userLikes!: [];
  liked!: boolean;
}
