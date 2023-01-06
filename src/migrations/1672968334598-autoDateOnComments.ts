import { MigrationInterface, QueryRunner } from "typeorm";

export class autoDateOnComments1672968334598 implements MigrationInterface {
    name = 'autoDateOnComments1672968334598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "update_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "date" character varying NOT NULL`);
    }

}
