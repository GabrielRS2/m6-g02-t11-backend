import { MigrationInterface, QueryRunner } from "typeorm";

export class userEntity1672840243031 implements MigrationInterface {
    name = 'userEntity1672840243031'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "cpf" character varying NOT NULL, "phone" character varying NOT NULL, "dob" character varying NOT NULL, "description" character varying NOT NULL, "isSeller" boolean NOT NULL, "isActive" boolean NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
