import { MigrationInterface, QueryRunner } from "typeorm";

export class createRolesTableAndAddRelation1666665118734 implements MigrationInterface {
    name = 'createRolesTableAndAddRelation1666665118734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(12) NOT NULL DEFAULT 'player', \`description\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_ff503f858b61860b2b7d7a55ce\` (\`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_roles\` (\`role_id\` int NOT NULL, \`user_id\` int NOT NULL, INDEX \`IDX_1cf664021f00b9cc1ff95e17de\` (\`role_id\`), INDEX \`IDX_e4435209df12bc1f001e536017\` (\`user_id\`), PRIMARY KEY (\`role_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` ADD CONSTRAINT \`FK_1cf664021f00b9cc1ff95e17de4\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` ADD CONSTRAINT \`FK_e4435209df12bc1f001e5360174\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_roles\` DROP FOREIGN KEY \`FK_e4435209df12bc1f001e5360174\``);
        await queryRunner.query(`ALTER TABLE \`users_roles\` DROP FOREIGN KEY \`FK_1cf664021f00b9cc1ff95e17de4\``);
        await queryRunner.query(`DROP INDEX \`IDX_e4435209df12bc1f001e536017\` ON \`users_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_1cf664021f00b9cc1ff95e17de\` ON \`users_roles\``);
        await queryRunner.query(`DROP TABLE \`users_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_ff503f858b61860b2b7d7a55ce\` ON \`roles\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
    }

}
