import { Component, OnInit, Type } from '@angular/core';
import { StateFormService } from './services/state-form.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Step1Component } from './steps/step-1/step-1.component';
import { Step2Component } from './steps/step-2/step-2.component';
import { Step3Component } from './steps/step-3/step-3.component';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss'
})
export class StepperComponent implements OnInit {
  steps: string[] = [];
  currentStep: number = 1;
  stepComponentMap: { [key: number]: Type<any> } = {
    1: Step1Component,
    2: Step2Component,
    3: Step3Component,
  };

  get currentComponent() {
    return this.stepComponentMap[this.currentStep];
  }

  constructor(private stateService: StateFormService) {}

  ngOnInit() {
    this.steps = this.stateService.getSteps();
    this.stateService.currentStep$.subscribe(step => this.currentStep = step);
  }
}