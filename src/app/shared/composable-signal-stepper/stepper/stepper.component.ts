import { CommonModule } from '@angular/common';
import { Component, computed, effect, EffectRef, EventEmitter, inject, Injector, Input, OnChanges, OnDestroy, OnInit, Output, runInInjectionContext, signal, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
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
  @Input({ required: true }) stepsConfig: StepperConfigModel[] = [];
  @Output() completed = new EventEmitter<any>();
  @Output() restarted = new EventEmitter<void>();
  @Output() onExchangeStep = new EventEmitter<StepExchangeModel>();

  @ViewChild('stepContainer', { read: ViewContainerRef, static: true })
  private stepContainer!: ViewContainerRef;

  @ViewChild(StepperComponent) stepper!: StepperComponent;

  private subscriptions = new Subscription();
  private stepperService = inject(StepperService);
  private injector = inject(Injector);
  private stepChangeEffect?: EffectRef;

  steps = this.stepperService.steps;
  currentStep = this.stepperService.currentStep;
  canProceed = this.stepperService.canProceed;
  totalSteps = this.stepperService.totalSteps;

  constructor() {}

  ngOnInit(): void {
    // Inicializa o stepper
    this.stepperService.init(this.stepsConfig);

    this.stepChangeEffect = runInInjectionContext(this.injector, () =>
      effect(() => {
        const current = this.stepperService.currentStep();
        const previous = this.stepperService.previousStep();
    
        if (current !== previous && previous !== null) {
          this.emitExchangeEvent(previous, current);
        }
    
        this.loadCurrentStep();
      })
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['stepsConfig']) {
      this.stepperService.updateSteps(changes['stepsConfig'].currentValue);
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.stepChangeEffect?.destroy();
  }

  next()     { this.stepperService.next(); }
  previous() { this.stepperService.previous(); }
  restart()  { 
    this.stepperService.restart(); 
    this.restarted.emit();
  }
  complete() { this.completed.emit(); }

  goTo(index: number) {
    this.stepperService.goTo(index); 
  }

  goToTitle(title: string) {
    this.stepperService.goToTitle(title);
  }
  
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
    this.clearCurrentStep();
    this.createStepComponent();
  }
  
  private clearCurrentStep() {
    this.subscriptions.unsubscribe();
    this.subscriptions = new Subscription();
    this.stepContainer.clear();
  }
  
  private createStepComponent() {
    const idx = this.stepperService.currentStep();
    const def = this.stepsConfig[idx - 1];
    if (!def) return;
  
    const ref = this.stepContainer.createComponent(def.component);
  
    if (def.outputs) {
      for (const [outputName, handler] of Object.entries(def.outputs)) {
        const emitter = (ref.instance as any)[outputName];
        if (this.isEventEmitter(emitter)) {
          const s = emitter.subscribe((payload: any) => handler(payload));
          this.subscriptions.add(s);
        }
      }
    }
  }
  
  // Pequeno helper para validar se é um EventEmitter
  private isEventEmitter(obj: any): obj is EventEmitter<any> {
    return obj && typeof obj.subscribe === 'function';
  }
  
}
  
