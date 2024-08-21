import { ICreateLeague, ILeague } from '@domain/models/league.interface';
import { LeagueRepository } from '@infrastructure/typeorm/league/league.repository';
import { CreateNewLeagueUseCases } from './create-new-league.usecase';
import { RetrieveAllLeagueUseCases } from './retrieve-all-league.usecase';
import { RetrieveLeagueByIdUseCases } from './retrieve-league-by-id.usecase';

describe('uses-cases/league', () => {
  let createNewLeagueUseCases: CreateNewLeagueUseCases;
  let retrieveLeagueByIdUseCases: RetrieveLeagueByIdUseCases;
  let retrieveAllLeagueUseCases: RetrieveAllLeagueUseCases;
  let leagueRepository: LeagueRepository;

  const expectedResult: ILeague = {
    id: 1,
    name: 'English Premier League',
    sport: 'soccer',
    teams: [],
    createdDate: new Date(),
    updatedDate: new Date(),
  };

  beforeEach(() => {
    leagueRepository = {} as LeagueRepository;
    leagueRepository.create = jest.fn();
    leagueRepository.getById = jest.fn();
    leagueRepository.get = jest.fn();
    createNewLeagueUseCases = new CreateNewLeagueUseCases(leagueRepository);
    retrieveLeagueByIdUseCases = new RetrieveLeagueByIdUseCases(
      leagueRepository,
    );
    retrieveAllLeagueUseCases = new RetrieveAllLeagueUseCases(leagueRepository);
  });

  describe('creating a new league', () => {
    it('should return a new league', async () => {
      const payload: ICreateLeague = {
        name: 'English Premier League',
        sport: 'soccer',
      };

      (leagueRepository.create as jest.Mock).mockReturnValue(
        Promise.resolve(expectedResult),
      );
      const result = await createNewLeagueUseCases.execute(payload);
      expect(leagueRepository.create).toHaveBeenCalledWith(payload);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('Retrieve league', () => {
    it('Should return a new league with the given id 1', async () => {
      const payload = 1;

      (leagueRepository.getById as jest.Mock).mockReturnValue(
        Promise.resolve(expectedResult),
      );
      const result = await retrieveLeagueByIdUseCases.execute(payload);
      expect(leagueRepository.getById).toHaveBeenCalledWith(payload);
      expect(result).toEqual(expectedResult);
    });

    it('Should return null if league was not found', async () => {
      const payload = 2;
      (leagueRepository.getById as jest.Mock).mockReturnValue(
        Promise.resolve(null),
      );
      const result = await retrieveLeagueByIdUseCases.execute(payload);
      expect(leagueRepository.getById).toHaveBeenCalledWith(payload);
      expect(result).toEqual(null);
    });

    it('Should return Retrieve all league', async () => {
      (leagueRepository.get as jest.Mock).mockReturnValue(
        Promise.resolve([expectedResult]),
      );
      const result = await retrieveAllLeagueUseCases.execute();
      expect(leagueRepository.get).toHaveBeenCalled();
      expect(result).toEqual([expectedResult]);
    });
  });
});
