import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Directive } from '@angular/core';

export const phoneValidator = (control: AbstractControl): ValidationErrors | null => {
  const validNumber = /^[+][9][9][6]+[-\s]?([0-9]{3})+[-\s]?([0-9]{3})+[-\s]?([0-9]{3})$/.test(control.value);
  if (validNumber) {
    return null;
  }
  return {phone: true};
}

@Directive({
  selector: '[appPhone]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidatePhoneDirective,
    multi: true
  }]
})
export class ValidatePhoneDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return phoneValidator(control);
  }
}
