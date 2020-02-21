import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentoPesquisaComponent } from './lancamento-pesquisa/lancamento-pesquisa.component';

const routes: Routes = [
  { path: 'lancamentos', component: LancamentoPesquisaComponent },
  { path: 'lancamentos/novo', component: LancamentoCadastroComponent },
  { path: 'lancamentos/:codigo', component: LancamentoCadastroComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LancamentosRoutingModule { }
