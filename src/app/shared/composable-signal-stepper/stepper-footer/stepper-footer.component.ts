import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, Signal, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-stepper-footer',
  imports: [CommonModule],
  templateUrl: './stepper-footer.component.html',
  styleUrl: './stepper-footer.component.scss'
})
export class StepperFooterComponent  {

  @Input({ required: true }) currentStep!: Signal<number>;
  @Input({ required: true }) canProceed!: Signal<boolean>;
  @Input({ required: true }) totalSteps!: number;

  @Output() next     = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();
  @Output() confirm  = new EventEmitter<void>();
  @Output() restart  = new EventEmitter<void>();

}
