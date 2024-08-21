import { Component } from '@angular/core';
import { LeagueType } from '@common/types/league.type';
import { Observable } from 'rxjs';
import { LeagueService } from 'src/app/services/league.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private readonly _leagueService: LeagueService) {}

  public leagues$: Observable<LeagueType[]> = this._leagueService.get();
}
