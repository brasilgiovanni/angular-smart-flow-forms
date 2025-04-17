import { Component, effect, inject, OnDestroy, ViewChild } from '@angular/core';
import { StepperConfigModel } from '../shared/stepper/stepper-config-model';
import { StateFormService } from './services/state-form.service';
import { HttpProtocolService } from './services/http-protocol.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StepperComponent } from '../shared/stepper/stepper/stepper.component';
import { MockHttpProtocolService } from '../mockServices/mock-http-protocol.service';
import { Subscription } from 'rxjs';
import { getStep } from './services/available-steps';

@Component({
  selector: 'app-pse-01',
  imports: [CommonModule, ReactiveFormsModule,
    StepperComponent],
  templateUrl: './pse-01.component.html',
  styleUrl: './pse-01.component.scss',
  providers: [
    { provide: HttpProtocolService, useClass: MockHttpProtocolService }
  ]
})
export class Pse01Component implements OnDestroy {
  @ViewChild(StepperComponent) stepper!: StepperComponent;
  private subscription = new Subscription();
  steps: StepperConfigModel[] = [];

  private stateForm = inject(StateFormService);
  private httpService = inject(HttpProtocolService)

  constructor() {
    this.criarSteps();
    // reage a atualização de Signals
    effect(() => {
      const option = this.stateForm.selectedOption();
      this.changeStepFlow(option);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.stateForm.resetForms();
  }

  private criarSteps(): void {
    const deps = {
      stateForm: this.stateForm,
      goToFn: (title: string) => this.stepper.goToTitle(title)
    };
    this.steps = [
      getStep.a(deps),
      getStep.b(deps),
      getStep.d(deps),
      getStep.c(deps),
    ];
  }

  onComplete() {
    const payload = this.stateForm.getAllData();
    this.subscription.add(
      this.httpService.registerUser(payload).subscribe({
        next: () => console.log('Usuário cadastrado com sucesso!'),
        error: err => console.error('Erro ao cadastrar:', err)
      })
    );
  }

  onRestart() {
    this.stateForm.resetForms();
  }

  handleStepChange(event: { previousStep: any, currentStep: any }) {
    console.log('Trocou de step', event);
  }

  changeStepFlow(option: string | null) {
    if (option == "E") {
      const deps = {
        stateForm: this.stateForm,
      };
      this.steps = [
        getStep.a(deps),
        getStep.b(deps),
        getStep.d(deps),
        getStep.e()
      ];
    } else {
      this.criarSteps();
    }
  }

}
