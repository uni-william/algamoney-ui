import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { AuthService } from './../seguranca/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConfirmationService } from 'primeng/api';

import { PessoaService } from './../pessoas/pessoa.service';
import { LancamentoService } from './../lancamentos/lancamento.service';
import { CategoriaService } from './../categorias/categoria.service';
import { ErrorHandlerService } from './error-handler.service';

import { NavbarComponent } from './navbar/navbar.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { Title } from '@angular/platform-browser';


@NgModule({
  declarations: [NavbarComponent, PaginaNaoEncontradaComponent],
  imports: [
    CommonModule,
    RouterModule,

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
    AuthService,
    ConfirmationService,
    Title,
    JwtHelperService,
    ErrorHandlerService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }

  ]
})
export class CoreModule { }
