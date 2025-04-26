import { Component, Input, OnInit } from '@angular/core';
import { StateFormService } from '../services/state-form.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Input() steps: string[] = [];
  currentStep: number = 1;

  constructor(private stateService: StateFormService) {}

  ngOnInit() {
    this.stateService.currentStep$.subscribe(step => this.currentStep = step);
  }
}
