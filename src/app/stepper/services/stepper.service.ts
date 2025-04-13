import { Injectable } from '@angular/core';
import { StateFormService } from './state-form.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class StepperService {

  constructor(private stateService: StateFormService) { }

  /** Avança de step somente se o form do step atual for válido */
  nextStep() {
    const current = this.stateService.currentStepValue;
    const total = this.stateService.getSteps().length;

    if (current < total && this.canProceed(current)) {
      this.stateService.setCurrentStep(current + 1);
    }
  }

  /** Sempre permite voltar, ou bloqueia no primeiro step */
  previousStep() {
    const current = this.stateService.currentStepValue;
    if (current > 1) {
      this.stateService.setCurrentStep(current - 1);
    }
  }

  restart() {
    this.stateService.resetForms();
  }

  /** Retorna true se o form do step dado estiver válido (ou não existir form) */
  canProceed(step: number): boolean {
    const form = this.getFormForStep(step);
    if (!form) return true;
    form.updateValueAndValidity({ emitEvent: true });
    return form.valid;
  }

  /** Mapeia step → FormGroup */
  private getFormForStep(step: number): FormGroup | null {
    switch (step) {
      case 1: return this.stateService.personalForm;
      case 2: return this.stateService.contactForm;
      default: return null;  // step 3 não tem form
    }
  }
}
