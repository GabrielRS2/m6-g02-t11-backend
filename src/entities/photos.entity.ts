import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";

import { Product } from "./products.entity";


@Entity("photos")
export class Photo {
  @PrimaryColumn("uuid")
  readonly id:string;

	@Column()
	content:string;

	@Column({default:false})
	is_cover_img:boolean;

	 @ManyToOne(()=> Product, {eager:true})
	 product: Product

	constructor() {
		if (!this.id){
			this.id = uuid();
		}
	}
}