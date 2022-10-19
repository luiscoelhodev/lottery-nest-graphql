import { MigrationInterface, QueryRunner } from "typeorm";

export class createCartTable1666208076188 implements MigrationInterface {
    name = 'createCartTable1666208076188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`cart\` (\`id\` int NOT NULL AUTO_INCREMENT, \`min_cart_value\` decimal(5,2) UNSIGNED NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`cart\``);
    }

}
