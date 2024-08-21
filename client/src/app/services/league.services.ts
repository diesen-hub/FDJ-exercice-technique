import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LeagueType } from '@common/types/league.type';
import { TeamType } from '@common/types/team.type';
import { Observable } from 'rxjs';
import { endpoints } from 'src/assets/api/api.enpoints';

@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  constructor(private readonly _httpClient: HttpClient) {}

  public get(): Observable<LeagueType[]> {
    return this._httpClient.get<LeagueType[]>(`${endpoints.league.base}`);
  }

  public getTeamByLeagueId(id: string): Observable<TeamType[]> {
    const newEndpoint = endpoints.league.getTeamByLeagueId.replace('{id}', id);
    return this._httpClient.get<TeamType[]>(`${newEndpoint}`);
  }
}
