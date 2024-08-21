import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '../../components/components.module';
import { LeagueRoutingModule } from './league-routing.module';
import { LeagueComponent } from './league.component';

@NgModule({
  declarations: [LeagueComponent],
  imports: [CommonModule, LeagueRoutingModule, ComponentsModule],
})
export class LeagueModule {}
