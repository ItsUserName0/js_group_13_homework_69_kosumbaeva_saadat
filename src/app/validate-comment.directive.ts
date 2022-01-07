import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Directive } from '@angular/core';

export const commentValidator = (control: AbstractControl): ValidationErrors | null => {
  if (control.value === null) return null;
  if (control.value.length <= 300) {
    return null;
  }
  return {comment: true};
}

@Directive({
  selector: '[appComment]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidateCommentDirective,
    multi: true
  }]
})
export class ValidateCommentDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return commentValidator(control);
  }
}
