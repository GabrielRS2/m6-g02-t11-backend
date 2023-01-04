import { Column, Entity, PrimaryColumn, OneToOne } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
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

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
