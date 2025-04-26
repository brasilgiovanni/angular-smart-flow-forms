import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { StateFormService } from '../../services/state-form.service';
import { HttpProtocolService } from '../../services/http-protocol.service';
import { MockHttpProtocolService } from '../../../mockServices/mock-http-protocol.service';
import { Subscription } from 'rxjs';


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
export class Step1Component implements OnInit, OnDestroy {

  personalForm: FormGroup;
  ufs: string[] = [];
  municipios: string[] = [];

  private stateService = inject(StateFormService);
  private httpService = inject(HttpProtocolService);
  private subscriptions = new Subscription(); // 📌 Gerenciador de assinaturas

  constructor() {
    this.personalForm = this.stateService.personalForm;
  }

  ngOnInit(): void {
    this.carregarListas();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // ✅ Libera recursos ao destruir o componente
  }

  carregarListas(): void {
    this.loadUFs();
    if (this.personalForm.get('uf')?.value) {
      this.loadMunicipios();
    }
  }

  private loadUFs(): void {
    this.subscriptions.add(
      this.httpService.listUFs().subscribe(data => {
        this.ufs = data;
      })
    );
  }

  loadMunicipios(): void {
    const selectedUF = this.personalForm.get('uf')?.value;
    if (selectedUF) {
      this.subscriptions.add(
        this.httpService.listMunicipios(selectedUF).subscribe(data => {
          this.municipios = data;
        })  
      );
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
