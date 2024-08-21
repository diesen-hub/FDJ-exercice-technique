import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TitleService } from '../services/title.services';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [PagesComponent],
  imports: [CommonModule, PagesRoutingModule],
  providers: [TitleService],
})
export class PagesModule {}
