import { ToastyService } from 'ng2-toasty';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toasty: ToastyService) { }

  handle(erroResponse: any) {
    let msg: string;
    console.log('Ocorreu um erro', erroResponse);
    if (typeof erroResponse === 'string') {
      msg = erroResponse;
    } else if (erroResponse instanceof HttpErrorResponse && erroResponse.status >= 400 && erroResponse.status <= 499) {
      if (erroResponse.status === 403) {
        msg = 'Você não tem permissão para executar esta ação';
      } else {
        if (erroResponse.error.error) {
          msg = 'Erro ao processar serviço remoto. Tente novamente.';
        } else {
          msg = erroResponse.error[0].mensagemUsuario;
        }
      }
    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
    }
    this.toasty.error(msg);
  }
}
