import { Column, Entity, PrimaryColumn, OneToMany, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";

import { Photo } from "./photos.entity";
import { User } from "./user.entity";
import { Comment } from "./comments.entity";

@Entity("products")
export class Product {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  model: string;

  @Column()
  description: string;

  @Column()
  km: number;

  @Column()
  year: string;

  @Column({ default: "sale" })
  saleType: string;

  @Column()
  vehicleType: string;

  @Column()
  price: number;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Photo, (photo) => photo.product, {
    cascade: true,
  })
  photos: Photo[];

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.product)
  comments: Comment[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
