import { MigrationInterface, QueryRunner } from "typeorm";

export class addTableRelations1666209324131 implements MigrationInterface {
    name = 'addTableRelations1666209324131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bets\` ADD \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`bets\` ADD \`game_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`bets\` ADD CONSTRAINT \`FK_8e3c745e288eea6d3c9475550e2\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bets\` ADD CONSTRAINT \`FK_5f2d39b49ade7e54364af8350e9\` FOREIGN KEY (\`game_id\`) REFERENCES \`games\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bets\` DROP FOREIGN KEY \`FK_5f2d39b49ade7e54364af8350e9\``);
        await queryRunner.query(`ALTER TABLE \`bets\` DROP FOREIGN KEY \`FK_8e3c745e288eea6d3c9475550e2\``);
        await queryRunner.query(`ALTER TABLE \`bets\` DROP COLUMN \`game_id\``);
        await queryRunner.query(`ALTER TABLE \`bets\` DROP COLUMN \`user_id\``);
    }

}
