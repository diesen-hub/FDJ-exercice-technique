import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'league/:id',
    loadChildren: () =>
      import('./league/league.module').then((m) => m.LeagueModule),
  },
  {
    path: 'team/:id',
    loadChildren: () => import('./team/team.module').then((m) => m.TeamModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
