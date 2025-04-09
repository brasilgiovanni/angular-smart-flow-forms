import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControlOptions } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ValidationService } from './validation.service';

@Injectable({
  providedIn: 'root'
})
export class StateFormService {

   // Formulário do Step 1: Dados Pessoais
   personalForm: FormGroup = new FormGroup({
    nome: new FormControl('', [Validators.required, ValidationService.nameValidator]),
    cpf: new FormControl('', [Validators.required, ValidationService.cpfValidator]),
    uf: new FormControl('', Validators.required),
    municipio: new FormControl('', Validators.required)
  });

  // Formulário do Step 2: Dados de Contato Profissional
  contactForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, ValidationService.emailValidator]),
    linkedin: new FormControl(''),
    github: new FormControl(''),
    profissao: new FormControl('', Validators.required)
  }, <AbstractControlOptions>{
    validators: [ValidationService.contactValidator]
  });

  // Estado do step atual (começa em 1)
  private currentStepSubject = new BehaviorSubject<number>(1);
  currentStep$ = this.currentStepSubject.asObservable();

  get currentStepValue(): number {
    return this.currentStepSubject.getValue();
  }

  // Configuração dinâmica dos steps (pode ser atualizado conforme a necessidade)
  private steps: string[] = ['Dados Pessoais', 'Contato Profissional', 'Confirmação'];
  getSteps(): string[] {
    return this.steps;
  }
  
  setCurrentStep(step: number) {
    this.currentStepSubject.next(step);
  }
  
  resetForms() {
    this.personalForm.reset();
    this.contactForm.reset();
    this.setCurrentStep(1);
  }
}
