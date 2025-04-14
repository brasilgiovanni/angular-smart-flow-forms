import { Component, inject, Input, OnInit } from '@angular/core';
import { StateFormService } from '../services/state-form.service';
import { StepperService } from '../services/stepper.service';
import { HttpProtocolService } from '../services/http-protocol.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  @Input() totalSteps: number = 1;
  currentStep: number = 1;

  private stepperService = inject(StepperService);
  private stateService = inject(StateFormService);
  private httpService = inject(HttpProtocolService);

  constructor() { }

  ngOnInit() {
    this.stateService.currentStep$.subscribe(step => this.currentStep = step);
  }

  onPrevious() {
    this.stepperService.previousStep();
  }

  onNext() {
    this.stepperService.nextStep();
  }

  onCanProceed(): boolean {
    return this.stepperService.canProceed(this.currentStep);
  }

  onRestart() {
    this.stepperService.restart();
  }

  onConfirm() {
    const userData = {
      ...this.stateService.personalForm.value,
      ...this.stateService.contactForm.value
    };

    this.httpService.registerUser(userData).subscribe(response => {
      console.log('Usuário cadastrado com sucesso!', response);
      this.stepperService.restart();
    });
  }

}
