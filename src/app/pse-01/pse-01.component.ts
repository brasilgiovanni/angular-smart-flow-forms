import { Component, computed, inject, signal } from '@angular/core';
import { StepperConfigModel } from '../shared/stepper/stepper-config-model';
import { StateFormService } from './services/state-form.service';
import { HttpProtocolService } from './services/http-protocol.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StepAComponent } from './steps/step-a/step-a.component';
import { StepBComponent } from './steps/step-b/step-b.component';
import { StepCComponent } from './steps/step-c/step-c.component';
import { StepperComponent } from '../shared/stepper/stepper/stepper.component';
import { MockHttpProtocolService } from '../mockServices/mock-http-protocol.service';
import { Subscription } from 'rxjs';

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
export class Pse01Component {
  private subscription = new Subscription();
  steps: StepperConfigModel[] = [];
  
  private stateForm = inject(StateFormService);
  private httpService = inject(HttpProtocolService)

  constructor() {
    this.criarSteps();
  }

  private criarSteps(): void {
    this.steps = [
      {
        title: 'Dados Pessoais',
        component: StepAComponent,
        isValid: this.stateForm.personalValid
      },
      {
        title: 'Contato Profissional',
        component: StepBComponent,
        isValid: this.stateForm.contactValid
      },
      {
        title: 'Confirmação',
        component: StepCComponent,
        isValid: signal(true)
      }
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.stateForm.resetForms(); 
  }
}
