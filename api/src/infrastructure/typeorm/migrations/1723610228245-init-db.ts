import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDb1723610228245 implements MigrationInterface {
  name = 'InitDb1723610228245';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "league" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "sport" character varying(50) NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_0bd74b698f9e28875df738f7864" UNIQUE ("id"), CONSTRAINT "PK_110716368f5130cdc669dacea42" PRIMARY KEY ("name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "signin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "playerId" character varying NOT NULL, "teamId" character varying NOT NULL, "currency" character varying(20) NOT NULL, "amount" numeric(20,2) NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9e96ddc025712616fc492b3b588" UNIQUE ("id"), CONSTRAINT "PK_123a920848c6d6d24a9cfe601f8" PRIMARY KEY ("playerId", "teamId", "currency", "amount"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "player" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "teamId" character varying NOT NULL, "name" character varying(100) NOT NULL, "position" character varying(100) NOT NULL, "thumbnail" character varying NOT NULL, "born" date NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_65edadc946a7faf4b638d5e8885" UNIQUE ("id"), CONSTRAINT "PK_7baa5220210c74f8db27c06f8b4" PRIMARY KEY ("name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "team" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "leagueId" character varying NOT NULL, "name" character varying(100) NOT NULL, "thumbnail" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f57d8293406df4af348402e4b74" UNIQUE ("id"), CONSTRAINT "PK_0fbb40458e3abb2e74076f075af" PRIMARY KEY ("leagueId", "name"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "signin" ADD CONSTRAINT "FK_f3618fd042b3ae93431f1482763" FOREIGN KEY ("teamId", "teamId") REFERENCES "team"("leagueId","name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "signin" ADD CONSTRAINT "FK_0580b71fe876933b68a4e457b61" FOREIGN KEY ("playerId") REFERENCES "player"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "player" ADD CONSTRAINT "FK_d71ff0fb37e409432d439491023" FOREIGN KEY ("teamId", "teamId") REFERENCES "team"("leagueId","name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" ADD CONSTRAINT "FK_36d02c93049412c8e95bd478de9" FOREIGN KEY ("leagueId") REFERENCES "league"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "team" DROP CONSTRAINT "FK_36d02c93049412c8e95bd478de9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player" DROP CONSTRAINT "FK_d71ff0fb37e409432d439491023"`,
    );
    await queryRunner.query(
      `ALTER TABLE "signin" DROP CONSTRAINT "FK_0580b71fe876933b68a4e457b61"`,
    );
    await queryRunner.query(
      `ALTER TABLE "signin" DROP CONSTRAINT "FK_f3618fd042b3ae93431f1482763"`,
    );
    await queryRunner.query(`DROP TABLE "team"`);
    await queryRunner.query(`DROP TABLE "player"`);
    await queryRunner.query(`DROP TABLE "signin"`);
    await queryRunner.query(`DROP TABLE "league"`);
  }
}
