import { ToastyService } from 'ng2-toasty';
import { LancamentoService } from './../lancamento.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';

import { Lancamento } from './../../core/model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})


export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private handler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  salvar(form: NgForm) {
    this.lancamentoService.adicionar(this.lancamento)
    .then(() => {
      this.toasty.success('Lançamento adicionado com sucesso');
      form.reset();
      this.lancamento = new Lancamento();
    })
    .catch(erro => this.handler.handle(erro));
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then((categorias: any[]) => {
        this.categorias = categorias.map(c => ( { label: c.nome, value: c.codigo } ));
      })
      .catch(erro => this.handler.handle(erro));
  }

  carregarPessoas() {
    return this.pessoaService.listarTodas()
    .then((pessoas: any[]) => {
      this.pessoas = pessoas.map( p => ( {label: p.nome, value: p.codigo} ));
    })
    .catch(erro => this.handler.handle(erro));
  }

}
