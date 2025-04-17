import { CommonModule } from '@angular/common';
import { Component, computed, effect, EventEmitter, inject, Injector, Input, OnChanges, OnDestroy, OnInit, Output, runInInjectionContext, signal, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { StepperHeaderComponent } from '../stepper-header/stepper-header.component';
import { StepperFooterComponent } from '../stepper-footer/stepper-footer.component';
import { StepperService } from '../stepper.service';
import { Subscription } from 'rxjs';
import { StepperConfigModel } from '../stepper-config-model';
import { StepExchangeModel } from '../step-exchange-model';

@Component({
  selector: 'app-stepper',
  imports: [CommonModule, StepperHeaderComponent, StepperFooterComponent],
  providers: [StepperService],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss'
})
export class StepperComponent implements OnInit,OnChanges, OnDestroy{
  @Input() stepsConfig: StepperConfigModel[] = [];
  @Output() completed = new EventEmitter<any>();
  @Output() restarted = new EventEmitter<void>();
  @Output() onExchangeStep = new EventEmitter<StepExchangeModel>();

  @ViewChild('stepContainer', { read: ViewContainerRef, static: true })
  private stepContainer!: ViewContainerRef;

  @ViewChild(StepperComponent) stepper!: StepperComponent;

  private subscriptions = new Subscription();
  private stepperService = inject(StepperService);
  private injector = inject(Injector);
  // Guardamos o índice anterior como signal
  private previousStepIndex = signal(1);

  steps = this.stepperService.steps;
  currentStep = this.stepperService.currentStep;
  canProceed = this.stepperService.canProceed;
  totalSteps = this.stepperService.totalSteps;

  constructor() {}

  ngOnInit(): void {
    // Inicializa o stepper
    this.stepperService.init(this.stepsConfig);

    runInInjectionContext(this.injector, () => {
      // Observa alterações do computed (que depende de currentStep e previousStep)
      effect(() => {
        const { current, previous } = this.stepChangeInfo();

        // Só emite se o índice atual mudou
        if (current !== previous) {
          this.emitExchangeEvent(previous, current);
          this.previousStepIndex.set(current);
        }

        this.loadCurrentStep(); // carrega o novo step dinamicamente
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['stepsConfig']) {
      this.stepperService.updateSteps(changes['stepsConfig'].currentValue);
    }
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

  goToTitle(title: string) {
    this.stepperService.goToTitle(title);
  }

  // Computed que deriva os dados necessários
  private stepChangeInfo = computed(() => {
    const current = this.currentStep();
    const previous = this.previousStepIndex();

    return { current, previous };
  });
  
  private emitExchangeEvent(prevIndex: number, currentIndex: number) {
    const previousStep = this.stepsConfig[prevIndex - 1];
    const currentStep = this.stepsConfig[currentIndex - 1];

    if (!previousStep || !currentStep) return;

    this.onExchangeStep.emit({
      previousStep: {
        title: previousStep.title,
        index: prevIndex
      },
      currentStep: {
        title: currentStep.title,
        index: currentIndex
      }
    });
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
  
