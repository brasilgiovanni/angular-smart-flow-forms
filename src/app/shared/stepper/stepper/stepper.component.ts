import { CommonModule } from '@angular/common';
import { Component, effect, EventEmitter, inject, Injector, Input, OnDestroy, OnInit, Output, runInInjectionContext, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { StepperHeaderComponent } from '../stepper-header/stepper-header.component';
import { StepperFooterComponent } from '../stepper-footer/stepper-footer.component';
import { StepperService } from '../stepper.service';
import { Subscription } from 'rxjs';
import { StepperConfigModel } from '../stepper-config-model';

@Component({
  selector: 'app-stepper',
  imports: [CommonModule, StepperHeaderComponent, StepperFooterComponent],
  providers: [StepperService],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss'
})
export class StepperComponent implements OnInit, OnDestroy{
  @Input() stepsConfig: StepperConfigModel[] = [];
  @Output() completed = new EventEmitter<any>();
  @Output() restarted = new EventEmitter<void>();

  @ViewChild('stepContainer', { read: ViewContainerRef, static: true })
  private stepContainer!: ViewContainerRef;

  @ViewChild(StepperComponent) stepper!: StepperComponent;

  private subscriptions = new Subscription();
  private stepperService = inject(StepperService);
  private injector = inject(Injector);

  steps = this.stepperService.steps;
  currentStep = this.stepperService.currentStep;
  canProceed = this.stepperService.canProceed;
  totalSteps = this.stepperService.totalSteps;

  constructor() {}

  ngOnInit(): void {
    // Inicializa o stepper
    this.stepperService.init(this.stepsConfig);

    // Sempre que o currentStep mudar, recarrega o componente
    runInInjectionContext(this.injector, () => {
      effect(() => {
        this.stepperService.currentStep(); // força reatividade
        this.loadCurrentStep();
      });
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  next()     { this.stepperService.next(); }
  previous() { this.stepperService.previous(); }
  restart()  { 
    this.stepperService.restart(); 
    this.restarted.emit();
  }
  complete() { this.completed.emit(); }

  goTo(index: number) {
    this.stepperService.goTo(index); // interno do StepperService
  }
  

  private loadCurrentStep() {
    // Limpa subscrições anteriores e o container
    this.subscriptions.unsubscribe();
    this.subscriptions = new Subscription();
    this.stepContainer.clear();

    const idx = this.stepperService.currentStep();
    const def = this.stepsConfig[idx - 1];
    if (!def) return;

    // Cria o componente dinamicamente
    const ref = this.stepContainer.createComponent(def.component);

    // Se o step definiu outputs, conecta-os automaticamente
    if (def.outputs) {
      for (const [outputName, handler] of Object.entries(def.outputs)) {
        const emitter = (ref.instance as any)[outputName];
        if (emitter && typeof emitter.subscribe === 'function') {
          const s = emitter.subscribe((payload: any) => handler(payload));
          this.subscriptions.add(s);
        }
      }
    }
  }
  
}
  
