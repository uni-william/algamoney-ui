import { Component, OnInit } from '@angular/core';
import { RelatoriosService } from './../relatorios.service';

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrls: ['./relatorio-lancamentos.component.css']
})
export class RelatorioLancamentosComponent implements OnInit {

  periodoInicio: Date;
  periodoFim: Date;

  constructor(private relatoriosService: RelatoriosService) { }

  ngOnInit(): void {
  }

  gerar() {
    this.relatoriosService.relatorioLancamentoPorPessoa(this.periodoInicio, this.periodoFim)
    .then(relatorio => {
      const url = window.URL.createObjectURL(relatorio);

      window.open(url);
    });
  }

}
