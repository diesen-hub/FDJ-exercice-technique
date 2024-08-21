import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeagueComponent } from './league.component';

const routes: Routes = [
  {
    path: '',
    component: LeagueComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeagueRoutingModule {}
