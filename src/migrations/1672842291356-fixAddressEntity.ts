import { MigrationInterface, QueryRunner } from "typeorm";

export class fixAddressEntity1672842291356 implements MigrationInterface {
    name = 'fixAddressEntity1672842291356'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_f75e99ed0e5883d74050628ed82"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "usersId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ADD "usersId" uuid`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_f75e99ed0e5883d74050628ed82" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
