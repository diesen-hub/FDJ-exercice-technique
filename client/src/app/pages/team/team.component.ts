import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PlayerType } from '@common/types/player.type';
import { Observable, switchMap } from 'rxjs';
import { TeamService } from 'src/app/services/team.services';

@Component({
  selector: 'app-home',
  templateUrl: './team.component.html',
})
export class TeamComponent {
  constructor(
    private readonly _activatedroute: ActivatedRoute,
    private readonly _teamService: TeamService
  ) {}

  public players$: Observable<PlayerType[]> = this._activatedroute.params.pipe(
    switchMap((params: Params) =>
      this._teamService.getPlayerByTeamId(params['id'])
    )
  );
}
