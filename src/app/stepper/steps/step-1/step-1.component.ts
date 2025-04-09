import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { StateFormService } from '../../services/state-form.service';
import { HttpProtocolService } from '../../services/http-protocol.service';
import { MockHttpProtocolService } from '../../../mockServices/mock-http-protocol.service';


@Component({
  selector: 'app-step-1',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './step-1.component.html',
  styleUrl: './step-1.component.scss',
  providers: [
    { provide: HttpProtocolService, useClass: MockHttpProtocolService }
  ]
})
export class Step1Component implements OnInit {
  personalForm: FormGroup;
  ufs: string[] = [];
  municipios: string[] = [];

  private stateService = inject(StateFormService);
  private httpService = inject(HttpProtocolService);

  constructor() {
    this.personalForm = this.stateService.personalForm;
  }

  ngOnInit(): void {
    this.httpService.listUFs().subscribe(data => {
      this.ufs = data; 
    });
  }

  loadMunicipios(): void {
    const selectedUF = this.personalForm.get('uf')?.value;
    if (selectedUF) {
      this.httpService.listMunicipios(selectedUF).subscribe(data => {
        this.municipios = data; 
      });
    }
  }

  checkCpf(): void {
    const cpfControl = this.personalForm.get('cpf');
    if (cpfControl?.valid) {
      this.httpService.validateCPF(cpfControl.value).subscribe(isValid => {
        if (!isValid) {
          cpfControl.setErrors({ cpfDuplicado: true });
        } else {
          const errors = cpfControl.errors;
          if (errors && 'cpfDuplicado' in errors) {
            delete errors['cpfDuplicado'];
            if (Object.keys(errors).length === 0) {
              cpfControl.setErrors(null);
            } else {
              cpfControl.setErrors(errors);
            }
          }
        }
      });
    }
  }
}
