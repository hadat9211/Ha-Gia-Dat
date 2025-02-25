import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1740451969224 implements MigrationInterface {
  name = "Migrations1740451969224";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`tt_Book\` (\`dtCreate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`dtUpdate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`n4BookId\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`strTitle\` varchar(500) NOT NULL, \`strDescription\` varchar(500) NULL, \`strPublisher\` varchar(500) NULL, \`strPublishedDate\` varchar(500) NULL, \`strISBN\` varchar(500) NOT NULL, \`strAuthor\` varchar(500) NOT NULL, \`strLanguage\` varchar(500) NOT NULL, \`n4PageCount\` varchar(500) NOT NULL, PRIMARY KEY (\`n4BookId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`tt_Genre\` (\`dtCreate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`dtUpdate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`n4GenreId\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`strGenre\` varchar(20) NOT NULL, PRIMARY KEY (\`n4GenreId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`tt_Book_Genre\` (\`n4BookId\` int UNSIGNED NOT NULL, \`n4GenreId\` int UNSIGNED NOT NULL, PRIMARY KEY (\`n4BookId\`, \`n4GenreId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`tt_Book_Genre\` ADD CONSTRAINT \`FK_aabe724143af69a336e58a56642\` FOREIGN KEY (\`n4BookId\`) REFERENCES \`tt_Book\`(\`n4BookId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`tt_Book_Genre\` ADD CONSTRAINT \`FK_73f93ec553320e7fb99e1ac50c6\` FOREIGN KEY (\`n4GenreId\`) REFERENCES \`tt_Genre\`(\`n4GenreId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`tt_Book_Genre\` DROP FOREIGN KEY \`FK_73f93ec553320e7fb99e1ac50c6\``
    );
    await queryRunner.query(
      `ALTER TABLE \`tt_Book_Genre\` DROP FOREIGN KEY \`FK_aabe724143af69a336e58a56642\``
    );
    await queryRunner.query(`DROP TABLE \`tt_Book_Genre\``);
    await queryRunner.query(`DROP TABLE \`tt_Genre\``);
    await queryRunner.query(`DROP TABLE \`tt_Book\``);
  }
}

