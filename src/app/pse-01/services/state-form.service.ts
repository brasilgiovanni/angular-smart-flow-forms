import { Injectable, signal } from "@angular/core";
import { FormGroup, FormControl, Validators, AbstractControlOptions, FormBuilder } from "@angular/forms";
import { ValidationFormsService } from "../../shared/services/validation-forms.service";
import { Subscription } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StateFormService {
    private subscriptions = new Subscription();
    // Formulários
    personalForm!: FormGroup;
    contactForm!: FormGroup;
    optionForm!: FormGroup;

    // Signals de validade
    private _personalValid = signal(false);
    private _contactValid = signal(false);
    private _optionValid = signal(false);
    private _selectedOption = signal<string | null>(null);

    // Signals expostos (readonly)
    readonly personalValid = this._personalValid.asReadonly();
    readonly contactValid = this._contactValid.asReadonly();
    readonly optionValid = this._optionValid.asReadonly();
    readonly selectedOption = this._selectedOption.asReadonly();

    constructor(private fb: FormBuilder) {
        this.construirFormulários();

        // Atualizando os Signals com base nas mudanças dos forms
        this.subscriptions.add(
            this.personalForm.statusChanges.subscribe(() => {
                this._personalValid.set(this.personalForm.valid);
            })
        );

        this.subscriptions.add(
            this.contactForm.statusChanges.subscribe(() => {
                this._contactValid.set(this.contactForm.valid);
            })
        );

        this.subscriptions.add(
            this.optionForm.statusChanges.subscribe(() => {
                this._optionValid.set(this.optionForm.valid);
            })
        );

        // Dispara valor inicial
        this._personalValid.set(this.personalForm.valid);
        this._contactValid.set(this.contactForm.valid);
        this._optionValid.set(this.optionForm.valid);
    }


    // Formulário do Step 1: Dados Pessoais
    private construirFormulários(): void {
        this.personalForm = this.fb.group({
            nome: new FormControl('', [Validators.required, ValidationFormsService.nameValidator]),
            cpf: new FormControl('', [Validators.required, ValidationFormsService.cpfValidator]),
            uf: new FormControl('', Validators.required),
            municipio: new FormControl('', Validators.required)
        });

        // Formulário do Step 2: Dados de Contato Profissional
        this.contactForm = this.fb.group({
            email: new FormControl('', [ValidationFormsService.emailValidator]),
            linkedin: new FormControl(''),
            github: new FormControl(''),
            profissao: new FormControl('', Validators.required)
        }, <AbstractControlOptions>{
            validators: [ValidationFormsService.contactValidator]
        });

        // Formulário do Componente D (step 3): Escolha se vai para o componente C ou E
        this.optionForm = this.fb.group({
            option: new FormControl<string>('', Validators.required)
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

    setSelectedOption(value: string) {
        this._selectedOption.set(value);
    }

}