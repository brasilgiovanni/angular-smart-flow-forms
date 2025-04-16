import { Signal, Type } from "@angular/core";

export interface StepperConfigModel {
    title: string;
    component: Type<any>;
    isValid: Signal<boolean>;
    /**  
     * Chaves são nomes de `@Output()` no componente, 
     * valores são handlers que o Stepper deve chamar.  
     */
    outputs?: {
      [outputName: string]: (payload: any) => void;
    };
}
