import { MigrationInterface, QueryRunner } from 'typeorm';

export class PopulateDb1723670127938 implements MigrationInterface {
  name = 'PopulateDb1723670127938';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        INSERT INTO league (id, name, sport)
        VALUES (1, 'English Premier League', 'soccer')
      `,
    );
    await queryRunner.query(
      `
        INSERT INTO team (id, "leagueId", name, thumbnail)
        VALUES (1, 1, 'Arsenal', 'https://www.thesportsdb.com//images//media//team//badge//a1af2i1557005128.png')
      `,
    );
    await queryRunner.query(
      `
        INSERT INTO player (id, "teamId", name, position, thumbnail, born)
        VALUES (1, 1, 'Pierre-Emerick Aubameyang', 'Forward', 'https://www.thesportsdb.com/images/media/player/thumb/fnk3u51520755737.jpg', '1989-06-19')
      `,
    );
    await queryRunner.query(
      `
        INSERT INTO signin (id, "teamId", "playerId", currency, amount)
        VALUES (1, 1, 1, 'eur', 63750000)
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        DELETE FROM signin
        WHERE id = 1
      `,
    );
    await queryRunner.query(
      `
        DELETE FROM player
        WHERE id = 1
      `,
    );
    await queryRunner.query(
      `
        DELETE FROM team
        WHERE id = 1
      `,
    );
    await queryRunner.query(
      `
        DELETE FROM league
        WHERE id = 1
      `,
    );
  }
}
