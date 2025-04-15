import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StateFormService } from '../../services/state-form.service';

@Component({
  selector: 'app-step-c',
  imports: [CommonModule],
  templateUrl: './step-c.component.html',
  styleUrl: './step-c.component.scss'
})
export class StepCComponent {
  personalForm : FormGroup;
  contactForm : FormGroup;

  private stateService = inject(StateFormService);

  constructor() {
    this.personalForm = this.stateService.personalForm;
    this.contactForm = this.stateService.contactForm;
  }
}
