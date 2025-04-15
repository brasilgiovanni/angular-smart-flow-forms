import { Injectable, signal } from "@angular/core";
import { FormGroup, FormControl, Validators, AbstractControlOptions, FormBuilder } from "@angular/forms";
import { ValidationService } from "../../stepper/services/validation.service";

@Injectable({
    providedIn: 'root'
})
export class StateFormService {
    // Formulários
    personalForm!: FormGroup;
    contactForm!: FormGroup;

    // Signals de validade
    private _personalValid = signal(false);
    private _contactValid = signal(false);

    // Signals expostos (readonly)
    readonly personalValid = this._personalValid.asReadonly();
    readonly contactValid = this._contactValid.asReadonly();

    constructor(private fb: FormBuilder) {
        this.construirFormulários();

        // Atualizando os Signals com base nas mudanças dos forms
        this.personalForm.statusChanges.subscribe(() => {
            this._personalValid.set(this.personalForm.valid);
        });

        this.contactForm.statusChanges.subscribe(() => {
            this._contactValid.set(this.contactForm.valid);
        });

        // Dispara valor inicial
        this._personalValid.set(this.personalForm.valid);
        this._contactValid.set(this.contactForm.valid);
    }


    // Formulário do Step 1: Dados Pessoais
    private construirFormulários(): void {
        this.personalForm = this.fb.group({
            nome: new FormControl('', [Validators.required, ValidationService.nameValidator]),
            cpf: new FormControl('', [Validators.required, ValidationService.cpfValidator]),
            uf: new FormControl('', Validators.required),
            municipio: new FormControl('', Validators.required)
        });

        // Formulário do Step 2: Dados de Contato Profissional
        this.contactForm = this.fb.group({
            email: new FormControl('', [ValidationService.emailValidator]),
            linkedin: new FormControl(''),
            github: new FormControl(''),
            profissao: new FormControl('', Validators.required)
        }, <AbstractControlOptions>{
            validators: [ValidationService.contactValidator]
        });
    }

    resetForms(): void {
        this.personalForm.reset();
        this.contactForm.reset();
        this._personalValid.set(false);
        this._contactValid.set(false);
    }

    getAllData(): any {
        return {
            ...this.personalForm.value,
            ...this.contactForm.value
        };
    }

}