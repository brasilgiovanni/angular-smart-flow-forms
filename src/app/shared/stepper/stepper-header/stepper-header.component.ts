import { CommonModule } from '@angular/common';
import { Component, Input, Signal } from '@angular/core';
import { StepperConfigModel } from '../stepper-config-model';

@Component({
  selector: 'app-stepper-header',
  imports: [CommonModule],
  templateUrl: './stepper-header.component.html',
  styleUrl: './stepper-header.component.scss'
})
export class StepperHeaderComponent {
  @Input({ required: true }) steps!: StepperConfigModel[];
  @Input({ required: true }) currentStep!: Signal<number>;
}
