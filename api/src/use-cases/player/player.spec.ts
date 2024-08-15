import { ICreatePlayer, IPlayer } from '@domain/models/player.inerface';
import { PlayerRepository } from '@infrastructure/typeorm/player/player.repository';
import { CreateNewPlayerUseCases } from './create-new-player.usecase';
import { RetrievePlayerByIdUseCases } from './retrieve-player-by-id.usecase';
import { RetrievePlayersByTeamIdUseCases } from './retrieve-players-by-team-id.usecase';

describe('uses-cases/player', () => {
  let createNewPlayerUseCases: CreateNewPlayerUseCases;
  let retrievePlayerByIdUseCases: RetrievePlayerByIdUseCases;
  let retrievePlayersByTeamIdUseCases: RetrievePlayersByTeamIdUseCases;
  let playerRepository: PlayerRepository;

  const expectedResult: IPlayer = {
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

  beforeEach(() => {
    playerRepository = {} as PlayerRepository;
    playerRepository.create = jest.fn();
    playerRepository.getById = jest.fn();
    playerRepository.getByTeamId = jest.fn();
    createNewPlayerUseCases = new CreateNewPlayerUseCases(playerRepository);
    retrievePlayerByIdUseCases = new RetrievePlayerByIdUseCases(
      playerRepository,
    );
    retrievePlayersByTeamIdUseCases = new RetrievePlayersByTeamIdUseCases(
      playerRepository,
    );
  });

  describe('creating a new player', () => {
    it('should return a new player', async () => {
      const payload: ICreatePlayer = {
        name: 'Pierre-Emerick Aubameyang',
        position: 'Forward',
        thumbnail:
          'https://www.thesportsdb.com/images/media/player/thumb/fnk3u51520755737.jpg',
        born: expectedResult.born,
      };

      (playerRepository.create as jest.Mock).mockReturnValue(
        Promise.resolve(expectedResult),
      );
      const result = await createNewPlayerUseCases.execute(payload);
      expect(playerRepository.create).toHaveBeenCalledWith(payload);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('Retrieve player', () => {
    it('Should return a new player with the given id 1', async () => {
      const payload = 1;

      (playerRepository.getById as jest.Mock).mockReturnValue(
        Promise.resolve(expectedResult),
      );
      const result = await retrievePlayerByIdUseCases.execute(payload);
      expect(playerRepository.getById).toHaveBeenCalledWith(payload);
      expect(result).toEqual(expectedResult);
    });

    it('Should return null if player was not found', async () => {
      const payload = 2;
      (playerRepository.getById as jest.Mock).mockReturnValue(
        Promise.resolve(null),
      );
      const result = await retrievePlayerByIdUseCases.execute(payload);
      expect(playerRepository.getById).toHaveBeenCalledWith(payload);
      expect(result).toEqual(null);
    });

    it('Should return Retrieve all player by team id', async () => {
      const payload = 1;

      (playerRepository.getByTeamId as jest.Mock).mockReturnValue(
        Promise.resolve([expectedResult]),
      );
      const result = await retrievePlayersByTeamIdUseCases.execute(payload);
      expect(playerRepository.getByTeamId).toHaveBeenCalledWith(payload);
      expect(result).toEqual([expectedResult]);
    });
  });
});
