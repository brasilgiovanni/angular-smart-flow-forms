import { Signal, Type } from "@angular/core";

export interface StepperConfigModel {
    title: string;
    component: Type<any>;
    isValid: Signal<boolean>;
}
