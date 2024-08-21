import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PlayerType } from '@common/types/player.type';
import {
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { TeamService } from 'src/app/services/team.services';
import { TitleService } from 'src/app/services/title.services';

@Component({
  selector: 'app-home',
  templateUrl: './team.component.html',
})
export class TeamComponent implements OnInit, OnDestroy {
  constructor(
    private readonly _activatedroute: ActivatedRoute,
    private readonly _teamService: TeamService,
    private readonly _titleService: TitleService,
    private readonly _router: Router
  ) {}

  public title = 'Players';
  private destroy$ = new Subject<void>();
  public players$: Observable<PlayerType[]> = this._activatedroute.params.pipe(
    switchMap((params: Params) =>
      this._teamService.getPlayerByTeamId(params['id'])
    )
  );

  ngOnInit(): void {
    this._titleService.titleRplSubj
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((title) => {
        this.title = title ?? this.title;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
