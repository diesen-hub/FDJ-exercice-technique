import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlayerType } from '@common/types/player.type';
import { Observable } from 'rxjs';
import { endpoints } from 'src/assets/api/api.enpoints';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private readonly _httpClient: HttpClient) {}

  public getPlayerByTeamId(id: string): Observable<PlayerType[]> {
    const newEndpoint = endpoints.team.getPlayerByTeamId.replace('{id}', id);
    return this._httpClient.get<PlayerType[]>(`${newEndpoint}`);
  }
}
