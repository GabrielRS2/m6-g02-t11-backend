import {
  Column,
  Entity,
  PrimaryColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Product } from "./products.entity";
import { User } from "./user.entity";

@Entity("comments")
export class Comment {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  content: string;

  @Column()
  date: string;

  @OneToOne(() => Product)
  @JoinColumn()
  product: Product;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
