import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';

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

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    if (this.auth.jwtPayload) {
      this.usuarioLogado = this.auth.jwtPayload.nome;
    } else {
      this.usuarioLogado = '';
    }
  }

  temPermissaoLancamento() {
    return this.auth.temPermissao(this.permissaoPequisaLancamnto);
  }

  temPermissaoPessoa() {
    return this.auth.temPermissao(this.permissaoPequisaPessoa);
  }

}
