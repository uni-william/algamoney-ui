import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { PessoaService } from './../pessoa.service';
import { Pessoa } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {


  pessoa = new Pessoa();
  constructor(
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private handler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
  }

  salvar(form: NgForm) {
    this.pessoaService.adicionar(this.pessoa)
    .then(() => {
      this.toasty.success('Pessoa adicionada com sucesso');
      form.reset();
      this.pessoa = new Pessoa();
    })
    .catch(erro => this.handler.handle(erro));
  }


}
