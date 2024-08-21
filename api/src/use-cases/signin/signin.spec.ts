import { IPlayer } from '@domain/models/player.interface';
import { ICreateSignin, ISignin } from '@domain/models/signin.interface';
import { ITeam } from '@domain/models/team.interface';
import { ExceptionsService } from '@infrastructure/exceptions/exceptions.service';
import { PlayerRepository } from '@infrastructure/typeorm/player/player.repository';
import { SigninRepository } from '@infrastructure/typeorm/signin/signin.repository';
import { TeamRepository } from '@infrastructure/typeorm/team/team.repository';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { CreateNewSigninUseCases } from './create-new-signin.usecase';

describe('uses-cases/signin', () => {
  let createNewSigninUseCases: CreateNewSigninUseCases;
  let signinRepository: SigninRepository;
  let teamRepository: TeamRepository;
  let playerRepository: PlayerRepository;
  let exceptionsService: ExceptionsService;

  const expectedTeamResult: ITeam = {
    id: 1,
    leagueId: 1,
    name: 'Arsenal',
    thumbnail:
      'https://www.thesportsdb.com//images//media//team//badge//a1af2i1557005128.png',
    players: [],
    signins: [],
    createdDate: new Date(),
    updatedDate: new Date(),
  };

  const expectedPlayerResult: IPlayer = {
    id: 1,
    teamId: 1,
    name: 'Pierre-Emerick Aubameyang',
    position: 'Forward',
    thumbnail:
      'https://www.thesportsdb.com/images/media/player/thumb/fnk3u51520755737.jpg',
    born: new Date(),
    signins: [],
    createdDate: new Date(),
    updatedDate: new Date(),
  };

  const expectedResult: ISignin = {
    id: 1,
    teamId: 1,
    playerId: 1,
    amount: 63750000,
    currency: 'eur',
    createdDate: new Date(),
    updatedDate: new Date(),
  };

  beforeEach(() => {
    signinRepository = {} as SigninRepository;
    signinRepository.create = jest.fn();

    teamRepository = {} as TeamRepository;
    teamRepository.getById = jest.fn();

    playerRepository = {} as PlayerRepository;
    playerRepository.create = jest.fn();
    playerRepository.getById = jest.fn();

    exceptionsService = {} as ExceptionsService;
    exceptionsService.notFoundException = (meassage) => {
      throw new NotFoundException(meassage);
    };

    createNewSigninUseCases = new CreateNewSigninUseCases(
      signinRepository,
      playerRepository,
      teamRepository,
      exceptionsService,
    );
  });

  describe('creating a new signin', () => {
    it('should return a new signin', async () => {
      const payload: ICreateSignin = {
        teamId: 1,
        playerId: 1,
        currency: 'eur',
        amount: 63750000,
      };

      (teamRepository.getById as jest.Mock).mockReturnValue(
        Promise.resolve(expectedTeamResult),
      );
      (playerRepository.getById as jest.Mock).mockReturnValue(
        Promise.resolve(expectedPlayerResult),
      );
      (signinRepository.create as jest.Mock).mockReturnValue(
        Promise.resolve(expectedResult),
      );
      const result = await createNewSigninUseCases.execute(payload);

      expect(teamRepository.getById).toHaveBeenCalledWith(payload.teamId);
      expect(playerRepository.getById).toHaveBeenCalledWith(payload.playerId);
      expect(playerRepository.create).toHaveBeenCalledWith(
        expectedPlayerResult,
      );
      expect(signinRepository.create).toHaveBeenCalledWith(payload);
      expect(result).toEqual(expectedResult);
    });
    it('should return throw not found error if team was not found', async () => {
      const payload: ICreateSignin = {
        teamId: 2,
        playerId: 1,
        currency: 'eur',
        amount: 63750000,
      };

      (teamRepository.getById as jest.Mock).mockReturnValue(
        Promise.resolve(null),
      );
      (playerRepository.getById as jest.Mock).mockReturnValue(
        Promise.resolve(expectedPlayerResult),
      );
      let hasThrown = false;
      try {
        await await createNewSigninUseCases.execute(payload);
      } catch (error) {
        hasThrown = true;
        expect(error).toBeInstanceOf(HttpException);
        expect((error as HttpException).getStatus()).toBe(HttpStatus.NOT_FOUND);
        expect(error.message as HttpException).toBe(
          `Team with the given id '${payload.teamId}' was not found`,
        );
      }
      expect(teamRepository.getById).toHaveBeenCalledWith(payload.teamId);
      expect(hasThrown).toBe(true);
    });
    it('should return throw not found error if player was not found', async () => {
      const payload: ICreateSignin = {
        teamId: 2,
        playerId: 2,
        currency: 'eur',
        amount: 63750000,
      };

      (playerRepository.getById as jest.Mock).mockReturnValue(
        Promise.resolve(null),
      );
      let hasThrown = false;
      try {
        await await createNewSigninUseCases.execute(payload);
      } catch (error) {
        hasThrown = true;
        expect(error).toBeInstanceOf(HttpException);
        expect((error as HttpException).getStatus()).toBe(HttpStatus.NOT_FOUND);
        expect(error.message as HttpException).toBe(
          `Player with the given id '${payload.playerId}' was not found`,
        );
      }
      expect(playerRepository.getById).toHaveBeenCalledWith(payload.playerId);
      expect(hasThrown).toBe(true);
    });
  });
});
