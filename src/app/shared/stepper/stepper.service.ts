import { computed, Injectable, Signal, signal } from '@angular/core';
import { StepperConfigModel } from './stepper-config-model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepperService {

  private _steps = signal<StepperConfigModel[]>([]);
  private _current = signal(1);

  readonly steps: Signal<StepperConfigModel[]> = this._steps;
  readonly currentStep: Signal<number> = this._current;
  readonly totalSteps = computed(() => this._steps().length);

  readonly canProceed: Signal<boolean> = computed(() => {
    const idx = this._current();
    const def = this._steps()[idx - 1];
    return def?.isValid() ?? true;
  });

  init(steps: StepperConfigModel[]) {
    this._steps.set(steps);
    this._current.set(1);
  }

  next() {
    if (this._current() < this._steps().length && this.canProceed()) {
      this._current.update(v => v + 1);
    }
  }

  previous() {
    if (this._current() > 1) {
      this._current.update(v => v - 1);
    }
  }

  goTo(step: number) {
    if (step >= 1 && step <= this._steps().length) {
      this._current.set(step);
    }
  }

  restart() {
    this._current.set(1);
  }

  getCurrentComponent() {
    return this._steps()[this._current() - 1]?.component;
  }
}
