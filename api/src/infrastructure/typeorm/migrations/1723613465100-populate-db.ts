import { MigrationInterface, QueryRunner } from 'typeorm';

export class PopulateDb1723613465100 implements MigrationInterface {
  name = 'PopulateDb1723613465100';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        INSERT INTO league (name, sport)
        VALUES ('English Premier League', 'soccer')
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        DELETE FROM league
        WHERE name = 'English Premier League' AND sport = 'soccer'
      `,
    );
  }
}
