import { Column, Entity, PrimaryColumn, OneToMany, ManyToOne } from "typeorm";
import { Exclude } from "class-transformer";
import { v4 as uuid } from "uuid";
import { Address } from "./address.entity";
import { Comment } from "./comments.entity";
import { Product } from "./products.entity";

@Entity("users")
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  cpf: string;

  @Column()
  phone: string;

  @Column()
  dob: string;

  @Column()
  description: string;

  @Column()
  isSeller: boolean;

  @Column()
  isActive: boolean;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @ManyToOne(() => Address, (address) => address.users)
  address: Address;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
