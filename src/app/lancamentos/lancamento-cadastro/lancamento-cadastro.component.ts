import { ToastyService } from 'ng2-toasty';
import { LancamentoService } from './../lancamento.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';

import { Lancamento } from './../../core/model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

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
    private handler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    const codigoLancamento = (this.route.snapshot.params['codigo']);

    this.title.setTitle('Novo lançamento');

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }


  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  inputFileChange(event) {
    this.lancamentoService.inputFileChange(event)
    .then(response => this.lancamento.anexo = response['arquivo']);
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
    .then(lancamento => {
      this.lancamento = lancamento;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.handler.handle(erro));
  }

  salvar(form: NgForm) {
    if ( this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  atualizarLancamento(form: NgForm) {
    this.lancamentoService.atualizar(this.lancamento)
    .then(lancamento => {
      this.lancamento = lancamento;
      this.toasty.success('Lançamento alterado com sucesso');
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.handler.handle(erro));
  }

  adicionarLancamento(form: NgForm) {
    this.lancamentoService.adicionar(this.lancamento)
    .then(lancamentoAdicionado => {
      this.toasty.success('Lançamento adicionado com sucesso');

      this.router.navigate(['/lancamentos/', lancamentoAdicionado.codigo]);
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

  novo(form: NgForm) {
    form.reset();
    setTimeout(() => {
      this.lancamento = new Lancamento();
    }, 1);
    this.router.navigate(['lancamentos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);
  }

}
