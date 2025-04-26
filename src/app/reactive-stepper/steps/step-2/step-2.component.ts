import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StateFormService } from '../../services/state-form.service';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-2',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './step-2.component.html',
  styleUrl: './step-2.component.scss'
})
export class Step2Component {

  contactForm : FormGroup;

  constructor(private stateService: StateFormService) {
    this.contactForm = this.stateService.contactForm;
  }
}
