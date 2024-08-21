const baseURL = 'http://localhost:3000/api';

export const endpoints = {
  league: {
    base: `${baseURL}/league`,
    getTeamByLeagueId: `${baseURL}/league/{id}/team`,
  },
  team: {
    base: `${baseURL}/team`,
    getPlayerByTeamId: `${baseURL}/team/{id}/player`,
  },
};
