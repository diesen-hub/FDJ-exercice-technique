import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetLeagueType, LeagueType } from '@common/types/league.type';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  ReplaySubject,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { LeagueService } from 'src/app/services/league.services';
import { TitleService } from 'src/app/services/title.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private readonly _leagueService: LeagueService,
    private readonly _titleService: TitleService,
    private readonly _fb: FormBuilder,
    private readonly _router: Router
  ) {}

  private nameRplSubj = new ReplaySubject<string | undefined>();
  public leagues$: Observable<LeagueType[]> = this.nameRplSubj.pipe(
    switchMap((name) => {
      const data: GetLeagueType = name ? { name } : {};
      return this._leagueService.get(data);
    })
  );

  public form = this._fb.group({
    name: new FormControl('', Validators.required),
  });
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.nameRplSubj.next(undefined);
    this.form
      .get('name')
      ?.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((search) => this.nameRplSubj.next(search));
  }

  handleCLick(league: LeagueType): void {
    this._titleService.titleRplSubj.next(league.name);
    this._router.navigate(['/league', league.id]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
