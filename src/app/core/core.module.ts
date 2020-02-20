import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { ConfirmationService } from 'primeng/api';

import { PessoaService } from './../pessoas/pessoa.service';
import { LancamentoService } from './../lancamentos/lancamento.service';
import { CategoriaService } from './../categorias/categoria.service';
import { ErrorHandlerService } from './error-handler.service';

import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,

    ConfirmDialogModule,
    ToastyModule.forRoot(),
  ],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule
  ],
  providers: [
    LancamentoService,
    PessoaService,
    CategoriaService,
    ConfirmationService,
    ErrorHandlerService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }

  ]
})
export class CoreModule { }
