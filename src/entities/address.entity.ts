import { Column, Entity, PrimaryColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./user.entity";

@Entity("addresses")
export class Address {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  cep: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column({ nullable: true })
  complement: string;

  @OneToMany(() => User, (user) => user.address)
  users: User[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
