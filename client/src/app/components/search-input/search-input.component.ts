import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchInputComponent),
      multi: true,
    },
  ],
})
export class SearchInputComponent implements ControlValueAccessor {
  constructor(private readonly _fb: FormBuilder) {}

  public value2 = this._fb.control('');
  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(value: string): void {
    this.value2.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  updateValue(event: Event): void {
    const newValue = (event.target as HTMLInputElement).value;
    this.value2.setValue(newValue);
    this.onChange(newValue);
    this.onTouch();
  }
}
