import {
  Column,
  Entity,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => User)
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
