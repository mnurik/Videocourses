import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';

@Component({
  selector: 'app-creation-date',
  template: `
    <mat-form-field>
      <input matInput type="date" placeholder="Date" name="creationDate">
    </mat-form-field>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CreationDateComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CreationDateComponent),
      multi: true,
    },
  ],
})
export class CreationDateComponent implements OnInit, ControlValueAccessor, Validator {

  constructor() { }

  ngOnInit() {
  }

  private propagateChange = (_: any) => { };

  public writeValue(obj: any) {
  }

  public registerOnChange(fn: any) {
  }

  public registerOnTouched() { }

  public validate() { }
}
