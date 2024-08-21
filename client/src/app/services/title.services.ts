import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  public titleRplSubj = new ReplaySubject<string>();
}
