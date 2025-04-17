import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StateFormService } from '../../services/state-form.service';

@Component({
  selector: 'app-step-c',
  imports: [CommonModule],
  templateUrl: './step-c.component.html',
  styleUrl: './step-c.component.scss'
})
export class StepCComponent {
  @Output() goToTitle  = new EventEmitter<string>();
  personalForm : FormGroup;
  contactForm : FormGroup;

  private stateService = inject(StateFormService);

  constructor() {
    this.personalForm = this.stateService.personalForm;
    this.contactForm = this.stateService.contactForm;
  }

  onEditar(step_title: string) {
    console.log("Chamando funcao onEditar" + step_title);
    this.goToTitle.emit(step_title);
  }
}
