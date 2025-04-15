import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output, Type } from '@angular/core';
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

  private subscriptions = new Subscription();
  private stepperService = inject(StepperService);

  steps = this.stepperService.steps;
  currentStep = this.stepperService.currentStep;
  canProceed = this.stepperService.canProceed;
  totalSteps = this.stepperService.totalSteps;
  currentComponent = () => this.stepperService.getCurrentComponent();

  constructor() {}

  ngOnInit(): void {
    this.stepperService.init(this.stepsConfig);
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
  onEditStep(n: number) { this.stepperService.goTo(n); }
  
}
  
