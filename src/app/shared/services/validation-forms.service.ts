import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationFormsService {

  static nameValidator(control: AbstractControl): ValidationErrors | null {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(control.value) ? null : { invalidName: true };
  }

  static cpfValidator(control: AbstractControl): ValidationErrors | null {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
    if (!cpfRegex.test(control.value)) {
      return { invalidCpfFormat: true };
    }
    if (/^(\d)\1+$/.test(control.value.replace(/\D/g, ''))) {
      return { invalidCpfDigits: true };
    }
    return null;
  }

  static emailValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      const emailRegex = /^[^\s@]+@gmail\.com$/;
      return emailRegex.test(control.value) ? null : { invalidEmail: true };
    }
    return null;
  }

  static contactValidator(group: FormGroup): ValidationErrors | null {
    const { email, linkedin, github } = group.value;
    return email || linkedin || github ? null : { atLeastOneContact: true };
  }
}