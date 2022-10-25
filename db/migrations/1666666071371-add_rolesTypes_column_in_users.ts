import { MigrationInterface, QueryRunner } from "typeorm";

export class addRolesTypesColumnInUsers1666666071371 implements MigrationInterface {
    name = 'addRolesTypesColumnInUsers1666666071371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`role_types\` varchar(255) NOT NULL AFTER \`password\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role_types\``);
    }

}
