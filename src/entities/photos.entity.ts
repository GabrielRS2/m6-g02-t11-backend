import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";


@Entity("photos")
export class Photo {
  @PrimaryColumn("uuid")
  readonly id:string;

	@Column()
	content:string;

	@Column({default:false})
	is_cover_img:boolean;

	// @ManyToOne(()=> Product, {eager:true})
	// @JoinColumn()
	// product: Product

	constructor() {
		if (!this.id){
			this.id = uuid();
		}
	}
}