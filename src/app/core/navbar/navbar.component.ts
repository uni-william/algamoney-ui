import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerService } from './../error-handler.service';
import { AuthService } from './../../seguranca/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu = false;
  usuarioLogado: string;
  permissaoPequisaLancamnto = 'ROLE_PESQUISAR_LANCAMENTO';
  permissaoPequisaPessoa = 'ROLE_PESQUISAR_PESSOA';

  constructor(
    private auth: AuthService,
    private erro: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.auth.jwtPayload) {
      this.usuarioLogado = this.auth.jwtPayload.nome;
    } else {
      this.usuarioLogado = '';
    }
  }

  logout() {
    this.auth.logout()
    .then(() => {
      this.router.navigate(['/login']);
    })
    .catch(erro => this.erro.handle(erro));
  }

  temPermissaoLancamento() {
    return this.auth.temPermissao(this.permissaoPequisaLancamnto);
  }

  temPermissaoPessoa() {
    return this.auth.temPermissao(this.permissaoPequisaPessoa);
  }

}
