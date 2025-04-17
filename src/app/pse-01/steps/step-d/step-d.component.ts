import { Component, inject, OnInit } from '@angular/core';
import { StateFormService } from '../../services/state-form.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-d',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step-d.component.html',
  styleUrl: './step-d.component.scss'
})
export class StepDComponent implements OnInit {
  private stateService = inject(StateFormService);

  optionForm: FormGroup;

  ngOnInit() {
    this.optionForm.get('option')?.valueChanges.subscribe(value => {
      this.stateService.setSelectedOption(value);
    });
  }
  

  constructor() {
    this.optionForm = this.stateService.optionForm;
  }

}
