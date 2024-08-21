import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TeamType } from '@common/types/team.type';
import { Observable, switchMap } from 'rxjs';
import { LeagueService } from 'src/app/services/league.services';

@Component({
  selector: 'app-home',
  templateUrl: './league.component.html',
})
export class LeagueComponent {
  constructor(
    private readonly _activatedroute: ActivatedRoute,
    private readonly _leagueService: LeagueService
  ) {}

  public teams$: Observable<TeamType[]> = this._activatedroute.params.pipe(
    switchMap((params: Params) =>
      this._leagueService.getTeamByLeagueId(params['id'])
    )
  );
}
