import { MigrationInterface, QueryRunner } from "typeorm";

export class createBetsTable1666207834769 implements MigrationInterface {
    name = 'createBetsTable1666207834769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`bets\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`games\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(30) NOT NULL, \`description\` varchar(255) NOT NULL, \`range\` int UNSIGNED NOT NULL, \`price\` decimal(5,2) NOT NULL, \`min_and_max_number\` int UNSIGNED NOT NULL, \`color\` varchar(20) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_b8009261429a0df7e802c0c9ce\` (\`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_b8009261429a0df7e802c0c9ce\` ON \`games\``);
        await queryRunner.query(`DROP TABLE \`games\``);
        await queryRunner.query(`DROP TABLE \`bets\``);
    }

}
