import { ICreateTeam, ITeam } from '@domain/models/team.interface';
import { TeamRepository } from '@infrastructure/typeorm/team/team.repository';
import { CreateNewTeamUseCases } from './create-new-team.usecase';
import { RetrieveTeamByIdUseCases } from './retrieve-team-by-id.usecase';
import { RetrieveTeamsByLeagueIdUseCases } from './retrieve-teams-by-league-id.usecase';

describe('uses-cases/team', () => {
  let createNewTeamUseCases: CreateNewTeamUseCases;
  let retrieveTeamByIdUseCases: RetrieveTeamByIdUseCases;
  let retrieveTeamsByLeagueIdUseCases: RetrieveTeamsByLeagueIdUseCases;
  let teamRepository: TeamRepository;

  const expectedResult: ITeam = {
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

  beforeEach(() => {
    teamRepository = {} as TeamRepository;
    teamRepository.create = jest.fn();
    teamRepository.getById = jest.fn();
    teamRepository.getByLeagueId = jest.fn();
    createNewTeamUseCases = new CreateNewTeamUseCases(teamRepository);
    retrieveTeamByIdUseCases = new RetrieveTeamByIdUseCases(teamRepository);
    retrieveTeamsByLeagueIdUseCases = new RetrieveTeamsByLeagueIdUseCases(
      teamRepository,
    );
  });

  describe('creating a new team', () => {
    it('should return a new team', async () => {
      const payload: ICreateTeam = {
        leagueId: 1,
        name: 'Arsenal',
        thumbnail:
          'https://www.thesportsdb.com//images//media//team//badge//a1af2i1557005128.png',
      };

      (teamRepository.create as jest.Mock).mockReturnValue(
        Promise.resolve(expectedResult),
      );
      const result = await createNewTeamUseCases.execute(payload);
      expect(teamRepository.create).toHaveBeenCalledWith(payload);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('Retrieve team', () => {
    it('Should return a new team with the given id 1', async () => {
      const payload = 1;

      (teamRepository.getById as jest.Mock).mockReturnValue(
        Promise.resolve(expectedResult),
      );
      const result = await retrieveTeamByIdUseCases.execute(payload);
      expect(teamRepository.getById).toHaveBeenCalledWith(payload);
      expect(result).toEqual(expectedResult);
    });

    it('Should return null if team was not found', async () => {
      const payload = 2;
      (teamRepository.getById as jest.Mock).mockReturnValue(
        Promise.resolve(null),
      );
      const result = await retrieveTeamByIdUseCases.execute(payload);
      expect(teamRepository.getById).toHaveBeenCalledWith(payload);
      expect(result).toEqual(null);
    });

    it('Should return Retrieve all team by league id', async () => {
      const payload = 1;

      (teamRepository.getByLeagueId as jest.Mock).mockReturnValue(
        Promise.resolve([expectedResult]),
      );
      const result = await retrieveTeamsByLeagueIdUseCases.execute(payload);
      expect(teamRepository.getByLeagueId).toHaveBeenCalledWith(payload);
      expect(result).toEqual([expectedResult]);
    });
  });
});
