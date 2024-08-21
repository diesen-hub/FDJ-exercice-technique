import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { TeamRoutingModule } from './team-routing.module';
import { TeamComponent } from './team.component';

@NgModule({
  declarations: [TeamComponent],
  imports: [CommonModule, TeamRoutingModule, ComponentsModule],
})
export class TeamModule {}
