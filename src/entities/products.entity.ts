import { Column, Entity, PrimaryColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";

import { Photo } from "./photos.entity";

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

  @OneToMany(() => Photo, (photo) => photo.product, { cascade: true })
  photos: Photo[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
