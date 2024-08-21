import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BackButtonComponent } from './back-button/back-button.component';
import { SearchInputComponent } from './search-input/search-input.component';

const component = [BackButtonComponent, SearchInputComponent];

@NgModule({
  declarations: [...component],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [...component],
})
export class ComponentsModule {}
