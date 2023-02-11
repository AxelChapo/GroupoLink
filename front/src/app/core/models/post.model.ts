import {User} from "./user.model";

export class Post {
  _id!: number;
  textContent!: string;
  imgUrl!: string;
  user!: User;
  createdDate!: Date;
  likes!: number;
  liked!: boolean;
}
