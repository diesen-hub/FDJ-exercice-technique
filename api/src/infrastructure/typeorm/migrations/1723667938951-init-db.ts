import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDb1723667938951 implements MigrationInterface {
  name = 'InitDb1723667938951';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "league" (
        "id" SERIAL NOT NULL, 
        "name" character varying(100) NOT NULL, 
        "sport" character varying(50) NOT NULL, 
        "createdDate" TIMESTAMP NOT NULL DEFAULT now(), 
        "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "PK_league" PRIMARY KEY ("id", "name")
      )`,
    );
    await queryRunner.query(
      `CREATE TABLE "signin" (
        "id" SERIAL NOT NULL, 
        "playerId" integer NOT NULL, 
        "teamId" integer NOT NULL, 
        "currency" character varying(20) NOT NULL, 
        "amount" integer NOT NULL, 
        "createdDate" TIMESTAMP NOT NULL DEFAULT now(), 
        "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "PK_signin" PRIMARY KEY ("id", "playerId", "teamId", "currency", "amount")
      )`,
    );
    await queryRunner.query(
      `CREATE TABLE "player" (
        "id" SERIAL NOT NULL, 
        "teamId" integer, 
        "name" character varying(100) NOT NULL, 
        "position" character varying(100) NOT NULL, 
        "thumbnail" character varying NOT NULL, 
        "born" date NOT NULL, 
        "createdDate" TIMESTAMP NOT NULL DEFAULT now(), 
        "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "PK_player" PRIMARY KEY ("id", "name")
      )`,
    );
    await queryRunner.query(
      `CREATE TABLE "team" (
        "id" SERIAL NOT NULL, 
        "leagueId" integer NOT NULL, 
        "name" character varying(100) NOT NULL, 
        "thumbnail" character varying NOT NULL, 
        "createdDate" TIMESTAMP NOT NULL DEFAULT now(), 
        "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "PK_team" PRIMARY KEY ("id", "leagueId", "name")
      )`,
    );

    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_league_id" ON "league" ("id")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_team_id" ON "team" ("id")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_player_id" ON "player" ("id")`,
    );

    await queryRunner.query(
      `
        ALTER TABLE "signin" 
        ADD CONSTRAINT "FK_210037f47d5f51b892a9ce9472c" 
        FOREIGN KEY ("teamId") 
        REFERENCES "team"("id") 
        ON DELETE NO ACTION ON UPDATE NO ACTION
      `,
    );
    await queryRunner.query(
      `
        ALTER TABLE "signin" 
        ADD CONSTRAINT "FK_f736ffde156c20a72927c13bd99" 
        FOREIGN KEY ("playerId") 
        REFERENCES "player"("id") 
        ON DELETE NO ACTION ON UPDATE NO ACTION
      `,
    );
    await queryRunner.query(
      `
        ALTER TABLE "player" 
        ADD CONSTRAINT "FK_6feba8b6b5a55d6ec20bb19daa6" 
        FOREIGN KEY ("teamId") 
        REFERENCES "team"("id") 
        ON DELETE NO ACTION ON UPDATE NO ACTION
      `,
    );
    await queryRunner.query(
      `
        ALTER TABLE "team" 
        ADD CONSTRAINT "FK_5b3c46b15cfd2b1bc15fbec32f5" 
        FOREIGN KEY ("leagueId") 
        REFERENCES "league"("id") 
        ON DELETE NO ACTION ON UPDATE NO ACTION
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "team" DROP CONSTRAINT "FK_5b3c46b15cfd2b1bc15fbec32f5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player" DROP CONSTRAINT "FK_6feba8b6b5a55d6ec20bb19daa6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "signin" DROP CONSTRAINT "FK_f736ffde156c20a72927c13bd99"`,
    );
    await queryRunner.query(
      `ALTER TABLE "signin" DROP CONSTRAINT "FK_210037f47d5f51b892a9ce9472c"`,
    );
    await queryRunner.query(`DROP TABLE "team"`);
    await queryRunner.query(`DROP TABLE "player"`);
    await queryRunner.query(`DROP TABLE "signin"`);
    await queryRunner.query(`DROP TABLE "league"`);
  }
}
