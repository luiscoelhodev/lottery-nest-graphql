import { MigrationInterface, QueryRunner } from "typeorm";

export class addNumbersColumnInBets1666345982120 implements MigrationInterface {
    name = 'addNumbersColumnInBets1666345982120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bets\` ADD \`numbers\` varchar(255) NOT NULL AFTER \`id\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bets\` DROP COLUMN \`numbers\``);
    }

}
