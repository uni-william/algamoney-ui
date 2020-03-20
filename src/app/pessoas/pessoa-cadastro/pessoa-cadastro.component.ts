import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { PessoaService } from './../pessoa.service';
import { Pessoa, Contato } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {


  pessoa = new Pessoa();
  exibindoFormularioContato = false;
  contato: Contato;
  contatoIndex: number;
  existe = false;
  estados: any[];
  cidades: any[];
  estadoSelecionado: number;


  constructor(
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private handler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    const codigoPessoa = (this.route.snapshot.params['codigo']);
    this.title.setTitle('Nova pessoa');

    this.carregarEstados();

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }

  prepararNovoContato() {
    this.exibindoFormularioContato = true;
    this.contato = new Contato();
    this.contatoIndex = this.pessoa.contatos.length;
  }

  prepararEdicaoContato(contato: Contato, index: number) {
    this.exibindoFormularioContato = true;
    this.contato = this.clonarContato(contato);
    this.contatoIndex = index;
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  get editandoContato() {
    return Boolean(this.contato && this.contato.codigo != null);
  }

  existeNome(nome: string, form: NgForm) {
    if (nome) {
    this.pessoaService.existeNome(nome)
      .then(resposta => {
        if (resposta && !this.editando) {
          form.controls['nome'].setErrors({ nameExists: true });
        }
        return resposta;
      })
      .catch(erro => false);
    }
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;

        this.estadoSelecionado = (this.pessoa.endereco.cidade) ? this.pessoa.endereco.cidade.estado.codigo : null;
        if (this.estadoSelecionado) {
          this.carregarCidades();
        }

        this.atualizarTituloEdicao();
      })
      .catch(erro => this.handler.handle(erro));
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  atualizarPessoa(form: NgForm) {
    this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.toasty.success('Pessoa alterada com sucesso');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.handler.handle(erro));
  }


  adicionarPessoa(form: NgForm) {
    this.pessoaService.adicionar(this.pessoa)
      .then(pessoaAdicionada => {
        this.toasty.success('Pessoa adicionada com sucesso');
        this.router.navigate(['/pessoas/', pessoaAdicionada.codigo]);
      })
      .catch(erro => this.handler.handle(erro));
  }

  novo(form: NgForm) {
    form.reset();
    setTimeout(() => {
      this.pessoa = new Pessoa();
    }, 1);
    this.router.navigate(['pessoas/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }

  confirmarContato(frm: NgForm) {
    this.pessoa.contatos[this.contatoIndex] = this.clonarContato(this.contato);
    this.exibindoFormularioContato = false;
    frm.reset();
  }

  removerContato(index: number) {
    this.pessoa.contatos.splice(index, 1);
  }

  clonarContato(contato: Contato): Contato {
    return new Contato(contato.codigo, contato.nome, contato.email, contato.telefone);
  }

  carregarEstados() {
    this.pessoaService.listarEstados()
    .then(lista => {
      this.estados = lista.map(uf => ({ label: uf.nome, value: uf.codigo }));
    })
    .catch(erro => this.handler.handle(erro));
  }

  carregarCidades() {
    this.pessoaService.pesquisarCidades(this.estadoSelecionado)
    .then(lista => {
      this.cidades = lista.map(c => ({ label: c.nome, value: c.codigo }));
    })
    .catch(erro => this.handler.handle(erro));
  }


}
