import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TeamType } from '@common/types/team.type';
import {
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { LeagueService } from 'src/app/services/league.services';
import { TitleService } from 'src/app/services/title.services';

@Component({
  selector: 'app-home',
  templateUrl: './league.component.html',
})
export class LeagueComponent implements OnInit, OnDestroy {
  constructor(
    private readonly _activatedroute: ActivatedRoute,
    private readonly _leagueService: LeagueService,
    private readonly _titleService: TitleService,
    private readonly _router: Router
  ) {}

  public title = 'Teams';
  private destroy$ = new Subject<void>();
  public teams$: Observable<TeamType[]> = this._activatedroute.params.pipe(
    switchMap((params: Params) =>
      this._leagueService.getTeamByLeagueId(params['id'])
    )
  );

  ngOnInit(): void {
    this._titleService.titleRplSubj
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((title) => {
        this.title = title ?? this.title;
      });
  }

  handleCLick(team: TeamType): void {
    this._titleService.titleRplSubj.next(team.name);
    this._router.navigate(['/team', team.id]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
