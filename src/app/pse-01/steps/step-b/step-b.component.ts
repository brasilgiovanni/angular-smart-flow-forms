import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StateFormService } from '../../services/state-form.service';

@Component({
  selector: 'app-step-b',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './step-b.component.html',
  styleUrl: './step-b.component.scss'
})
export class StepBComponent {

  contactForm : FormGroup;
  private stateService = inject(StateFormService);
  
  constructor() {
    this.contactForm = this.stateService.contactForm;
  }
}
