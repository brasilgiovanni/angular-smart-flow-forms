import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StateFormService } from '../../services/state-form.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step-3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-3.component.html',
  styleUrl: './step-3.component.scss'
})
export class Step3Component {
  personalForm : FormGroup;
  contactForm : FormGroup;

  constructor(private stateService: StateFormService) {
    this.personalForm = this.stateService.personalForm;
    this.contactForm = this.stateService.contactForm;
  }
}
