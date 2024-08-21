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

    let playerId = await queryRunner.query(
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

    playerId = await queryRunner.query(
      `
        INSERT INTO player ("teamId", name, position, thumbnail, born)
        VALUES (${teamId[0].id}, 'Ben White', 'Right Back', 'https://www.thesportsdb.com/images/media/player/cutout/tcxzcr1694203768.png', '1997-11-08')
        RETURNING id
      `,
    );
    await queryRunner.query(
      `
        INSERT INTO signin ("teamId", "playerId", currency, amount)
        VALUES (${teamId[0].id}, ${playerId[0].id}, 'eur', 25000000)
      `,
    );

    playerId = await queryRunner.query(
      `
        INSERT INTO player ("teamId", name, position, thumbnail, born)
        VALUES (${teamId[0].id}, 'David Raya', 'Goalkeeper', 'https://www.thesportsdb.com/images/media/player/cutout/9l0e931694204639.png', '1995-09-15')
        RETURNING id
      `,
    );
    await queryRunner.query(
      `
        INSERT INTO signin ("teamId", "playerId", currency, amount)
        VALUES (${teamId[0].id}, ${playerId[0].id}, 'eur', 15000000)
      `,
    );

    playerId = await queryRunner.query(
      `
        INSERT INTO player ("teamId", name, position, thumbnail, born)
        VALUES (${teamId[0].id}, 'Bukayo Saka', 'Right Winger', 'https://www.thesportsdb.com/images/media/player/cutout/0q2oif1694203861.png', '2001-09-05')
        RETURNING id
      `,
    );
    await queryRunner.query(
      `
        INSERT INTO signin ("teamId", "playerId", currency, amount)
        VALUES (${teamId[0].id}, ${playerId[0].id}, 'eur', 0)
      `,
    );

    await queryRunner.query(
      `
        INSERT INTO league (name, sport)
        VALUES 
          ('English Premier League', 'soccer'),
          ('English League Championship', 'soccer'),
          ('Scottish Premier League', 'soccer'),
          ('German Bundesliga', 'soccer'),
          ('Italian Serie A', 'soccer'),
          ('French Ligue 1 League', 'soccer'),
          ('Spanish La Liga', 'soccer'),
          ('Greek Superleague Greece', 'soccer'),
          ('Dutch Eredivisie', 'soccer')
      `,
    );

    await queryRunner.query(
      `
        INSERT INTO team ("leagueId", name, thumbnail)
        VALUES 
          (${leagueId[0].id}, 'Birmingham', 'https://www.thesportsdb.com/images/media/team/badge/wufs551672950865.png'),
          (${leagueId[0].id}, 'Bolton', 'https://www.thesportsdb.com/images/media/team/badge/yvxxrv1448808301.png'),
          (${leagueId[0].id}, 'Wigan', 'https://www.thesportsdb.com/images/media/team/badge/wtxwyw1448759640.png'),
          (${leagueId[0].id}, 'Blackpool', 'https://www.thesportsdb.com/images/media/team/badge/utywru1448754934.png'),
          (${leagueId[0].id}, 'Barnsley', 'https://www.thesportsdb.com/images/media/team/badge/xvxsuv1447437855.png'),
          (${leagueId[0].id}, 'Peterboro', 'https://www.thesportsdb.com/images/media/team/badge/tyxsvt1424033035.png'),
          (${leagueId[0].id}, 'Rotherham', 'https://www.thesportsdb.com/images/media/team/badge/uruupp1448811536.png')
      `,
    );
  }
  down(queryRunner: QueryRunner): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
