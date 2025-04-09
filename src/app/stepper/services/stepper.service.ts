import { Injectable } from '@angular/core';
import { StateFormService } from './state-form.service';

@Injectable({
  providedIn: 'root'
})
export class StepperService {

  constructor(private stateService: StateFormService) {}

  nextStep() {
    const current = this.stateService.currentStepValue;
    const totalSteps = this.stateService.getSteps().length;
    if (current < totalSteps) {
      this.stateService.setCurrentStep(current + 1);
    }
  }
  
  previousStep() {
    const current = this.stateService.currentStepValue;
    if (current > 1) {
      this.stateService.setCurrentStep(current - 1);
    }
  }

  restart() {
    this.stateService.resetForms();
  }
}
