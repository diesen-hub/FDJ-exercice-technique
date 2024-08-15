import { MigrationInterface, QueryRunner } from 'typeorm';

export class PopulateDb1723670127938 implements MigrationInterface {
  name = 'PopulateDb1723670127938';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const leagueId = await queryRunner.query(
      `
        INSERT INTO league (name, sport)
        VALUES ('English Premier League', 'soccer')
        RETURNING id
      `,
    );

    const teamId = await queryRunner.query(
      `
        INSERT INTO team ("leagueId", name, thumbnail)
        VALUES (${leagueId[0].id}, 'Arsenal', 'https://www.thesportsdb.com//images//media//team//badge//a1af2i1557005128.png')
        RETURNING id
      `,
    );

    const playerId = await queryRunner.query(
      `
        INSERT INTO player ("teamId", name, position, thumbnail, born)
        VALUES (${teamId[0].id}, 'Pierre-Emerick Aubameyang', 'Forward', 'https://www.thesportsdb.com/images/media/player/thumb/fnk3u51520755737.jpg', '1989-06-19')
        RETURNING id
      `,
    );

    await queryRunner.query(
      `
        INSERT INTO signin ("teamId", "playerId", currency, amount)
        VALUES (${teamId[0].id}, ${playerId[0].id}, 'eur', 63750000)
      `,
    );
  }
  down(queryRunner: QueryRunner): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
